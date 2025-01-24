"use client";

import { HttpError } from "http-errors";
import React from "react";

type GameStatusBarProps = {
  isConnected: boolean;
  showOponentDisconnected: boolean;
  showInQueueMessage: boolean;
  showWinMessage: boolean;
  showOpponentWon: boolean;
  showOpponentSurrender: boolean;
  showMySurrender: boolean;
  showOpponentTimeOut: boolean;
  showMyTimeOut: boolean;
  connectionError: null | HttpError;
};

export function GameStatusBar({
  isConnected,
  showOponentDisconnected,
  showInQueueMessage,
  showWinMessage,
  showOpponentWon,
  showOpponentSurrender,
  showMySurrender,
  showOpponentTimeOut,
  showMyTimeOut,
  connectionError,
}: GameStatusBarProps) {
  console.log(connectionError);

  return (
    <div>
      {!isConnected && !connectionError && <p>Connecting...</p>}
      {showWinMessage && <p>You won! +respect ^^</p>}
      {showOpponentWon && <p>You lost! -respect :|</p>}
      {showOponentDisconnected && (
        <div>
          <p>Opponent disconnected :| But You won! :D</p>
          <p>Let's try again</p>
        </div>
      )}
      {showInQueueMessage && <p>Waiting for opponent...</p>}
      {showOpponentSurrender && <p>Opponent surrendered! You won! :D</p>}
      {showMySurrender && (
        <p>
          You surrendered. Opponent won. The battle has been lost, but this is
          only the beginning.
        </p>
      )}
      {showOpponentTimeOut && <p>Opponent timed out! You won! :D</p>}
      {showMyTimeOut && <p>You timed out! Opponent won! :|</p>}
      {connectionError?.data ? (
        <>
          {connectionError.data.status === 409 && (
            <p>You are already connected somewhere in another tab</p>
          )}
          {(connectionError.data.status === 401 ||
            connectionError.data.status === 400) && <p>Authentication error</p>}
        </>
      ) : (
        connectionError && <p>Connection error</p>
      )}
    </div>
  );
}
