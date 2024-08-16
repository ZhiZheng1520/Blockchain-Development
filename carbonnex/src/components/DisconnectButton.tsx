"use client";
import { useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DisconnectButton() {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const onClick = () => {
    localStorage.clear();
    disconnect();
    router.push("/");
  };

  return (
    <Button
      onClick={onClick}
      className="bg-emerald-600 border border-emerald-600 text-white transition-colors duration-300 hover:bg-transparent hover:text-emerald-600 hover:border-emerald-600"
    >
      Disconnect
    </Button>
  );
}
