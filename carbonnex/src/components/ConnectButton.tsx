"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const [buttonText, setButtonText] = useState("Connect");
  const [isDisabled, setIsDisabled] = useState(false);

  const onClick = () => {
    if (address) {
      open();
    } else {
      open({ view: "Connect" });
    }
  };

  useEffect(() => {
    if (isConnected) {
      setButtonText("Connected");
      setIsDisabled(true);
    } else if (isConnecting) {
      setButtonText("Connecting");
      setIsDisabled(true);
    } else if (isDisconnected) {
      setButtonText("Connect");
      setIsDisabled(false);
    }
  }, [isConnecting, isConnected, isDisconnected]);

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className="bg-emerald-600 border border-emerald-600 text-white transition-colors duration-300 hover:bg-transparent hover:text-emerald-600 hover:border-emerald-600"
    >
      {buttonText}
    </Button>
  );
}
