import { createServer } from "http";
import { Server } from "socket.io";
import { Matchmaker } from "./matchmaker";
import { Player } from "@real_one_chess_king/game-logic";
import { GameMachine } from "./game-machine";
import {
  WSClientGameEvent,
  WSServerGameEvent,
} from "@real_one_chess_king/game-logic";
import { config } from "./env.config";
import jwt from "jsonwebtoken";
import createError, { HttpError } from "http-errors";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONT_END_URL, // TODO update for prod before release
    methods: ["GET", "POST"],
  },
  // transports: ["polling"],
  // key: readFileSync("/path/to/my/key.pem"),
  // cert: readFileSync("/path/to/my/cert.pem")
});

const matchmaker = new Matchmaker();

// Authorization middleware
const jwtSecret = config.jwt.secret;
if (!jwtSecret) {
  throw new Error("Jwt not found");
}

const connectedUsersPkeys = new Set<string>();

const wrapError = (error: HttpError) => {
  error.data = { status: error.status };
  return error;
};

io.use((socket, next) => {
  const authHeader = (socket.handshake.headers as any)["authorization"];

  if (!authHeader) {
    return next(wrapError(createError(401, "No token provided")));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(wrapError(createError(400, "Invalid token format")));
  }

  const token = authHeader.substring(7);

  jwt.verify(token, jwtSecret, (err: unknown, decoded: any) => {
    if (err) {
      return next(wrapError(createError(401, "Invalid token")));
    }
    if (err) {
      // Handle specific JWT errors
      if ((err as any).name === "TokenExpiredError") {
        return next(wrapError(createError(401, "Token expired")));
      } else {
        return next(wrapError(createError(401, "Invalid token")));
      }
    }

    if (!decoded || !decoded.payload) {
      return next(wrapError(createError(400, "Invalid token payload")));
    }

    (socket as any).user = decoded.payload; // Attach the decoded user data to the socket
    const pkey = decoded.payload.pkey;
    if (connectedUsersPkeys.has(pkey)) {
      console.log("pkey is already connected", connectedUsersPkeys);
      return next(wrapError(createError(409, "User already connected")));
    }
    connectedUsersPkeys.add(pkey);
    next(); // Allow the connection
  });
});

const gameMachines: GameMachine[] = []; // better structure is needed
io.on("connection", (socket) => {
  socket.on(WSClientGameEvent.FindGame, (data) => {
    // data will contain game settings
    const user = (socket as any).user;
    console.log("user->", user);

    console.log("on find game event");
    const player = new Player(user.pkey, user.nickName);
    const match = matchmaker.findMatch(player, socket);
    if (match) {
      const onMatchEnd = () => {
        gameMachines.splice(gameMachines.indexOf(gameMachine), 1);
      };
      const { game, opponentSocket } = match;
      const gameMachine = new GameMachine(
        game,
        socket,
        opponentSocket,
        onMatchEnd
      );
      gameMachines.push(gameMachine);
      gameMachine.beginGame();
    } else {
      socket.emit(WSServerGameEvent.WaitingForOpponent);
    }
  });
  socket.on("disconnect", () => {
    const user = (socket as any).user;
    connectedUsersPkeys.delete(user.pkey as string);
    console.log("user disconnected", socket.id);
    if (matchmaker.isSocketIdInQueue(socket.id)) {
      console.log("removing from queue");
      matchmaker.removeSocketFromQueue(socket.id);
    } else {
      const gameMachine = gameMachines.find((gameMachine) => {
        return gameMachine.isSocketIdInGame(socket.id);
      });
      if (gameMachine) {
        console.log("Finish game");
        gameMachine.handlePlayerDisconnect(socket.id);
        gameMachines.splice(gameMachines.indexOf(gameMachine), 1);
      }
    }
  });
});

io.listen(config.port);
console.log(`Listening ${config.port}`);
