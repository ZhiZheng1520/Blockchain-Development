import React from "react";

interface ConnectProps {
  onConnectClick: () => void;
}

export function Connect({ onConnectClick }: ConnectProps) {
  return (
    <div>
      <w3m-button
        label="Connect"
        balance="hide"
        size="sm"
        loadingLabel="Connecting"
        onClick={onConnectClick}
      />
    </div>
  );
}
