"use client";

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
}: GameStatusBarProps) {
  return (
    <div>
      {!isConnected && <p>Connecting...</p>}
      {showWinMessage && <p>You won! +respect ^^.</p>}
      {showOpponentWon && <p>You lost! -respect :| </p>}
      {showOponentDisconnected && (
        <div>
          <p>Opponent disconnected :| But You won! :D</p>
          <p>Let&#39;s try again</p>
        </div>
      )}
      {showInQueueMessage && <p>Waiting for opponent...</p>}
      {showOpponentSurrender && <p>Opponent surrendered! You won! :D</p>}
      {showMySurrender && (
        <p>
          You surrender. Opponent won. The Battle has been lost, but this is
          only beginning.
        </p>
      )}
      {showOpponentTimeOut && <p>Opponent time out! You won! :D</p>}
      {showMyTimeOut && <p>Your time out! Opponent won! :|</p>}
    </div>
  );
}
