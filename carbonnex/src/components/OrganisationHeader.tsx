import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Logo } from "./Images";
import { DisconnectButton } from "./DisconnectButton";

export function OrganisationHeader() {
  return (
    <header className="flex h-20 w-full items-center justify-between px-8 bg-emerald-950">
      <div className="flex items-center space-x-20">
        <Link href="/organisation" prefetch={false} className="flex items-center h-20">
          <Logo className="h-16 w-16" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-16">
            <NavigationMenuItem>
              <Link href="/organisation/marketplace" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Marketplace
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/organisation/sell" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sell
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/organisation/pasttransactions" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Transaction History
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/organisation/about-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <DisconnectButton />
      </div>
    </header>
  );
}
