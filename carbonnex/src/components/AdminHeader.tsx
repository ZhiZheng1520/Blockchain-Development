import Link from "next/link";
import { Logo } from "./Images";
import { DisconnectButton } from "./DisconnectButton";

export function AdminHeader() {
  return (
    <header className="flex h-20 w-full items-center justify-between px-8 bg-emerald-950">
      <div className="flex items-center space-x-20">
        <Link href="/administrator" prefetch={false} className="flex items-center h-20 space-x-8">
          <Logo className="h-16 w-16" />
          <span className="text-xl font-semibold text-white">Administrator Page</span>
        </Link>
      </div>
      <div className="ml-auto">
        <DisconnectButton />
      </div>
    </header>
  );
}
