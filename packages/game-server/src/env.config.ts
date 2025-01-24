export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.GAME_SERVER_PORT) as number,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
