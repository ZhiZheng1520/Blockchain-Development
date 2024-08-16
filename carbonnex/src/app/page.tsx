"use client";
import { ConnectButton } from "@/components/ConnectButton";
import { Logo } from "@/components/Images";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoginCredentials } from "@/database/function";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const login = async () => {
      const response = await getLoginCredentials(address as string);

      if (response) {
        if (response.length > 0) {
          localStorage.setItem("id", response[0].id.toString());
          localStorage.setItem(
            "organisation_name",
            response[0].organisation_name
          );
          localStorage.setItem("registration_id", response[0].registration_id);
          localStorage.setItem("role", response[0].role);

          if (response[0].role == "Organisation") {
            router.push("/organisation");
          } else if (response[0].role == "Administrator") {
            router.push("/administrator");
          } else {
            toast({
              title: "The role does not exist.",
            });
            disconnect();
            router.refresh();
          }
        } else {
          toast({
            title: "The address is not authorised.",
          });
          disconnect();
        }
      }
      router.refresh();
    };

    if (isConnected) {
      login();
    }
  }, [isConnected]);

  return (
    <div className="flex min-h-screen bg-emerald-950 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="max-w-xl space-y-6">
          <h1 className="text-6xl font-bold tracking-tight">
            Welcome to Carbonex
          </h1>
          <p className="text-lg">
            A Decentralised Carbon Credit Exchange Platform
          </p>
          <div>
            <ConnectButton />
          </div>
        </div>
        <div>
          <Logo className="min-h-screen w-400" />
        </div>
      </div>
    </div>
  );
}
