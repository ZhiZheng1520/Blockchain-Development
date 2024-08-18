"use client";
import { useEffect, useState } from "react";
import CarbonNexToken from "@/abi/CarbonNexToken.json";
import { useAccount, usePublicClient } from "wagmi";
import { tokenContractAddress } from "@/utils/smartContractAddress";
import { Address } from "viem";
import { getOrganisations } from "@/database/function";
import { OrganisationHeader } from "@/components/OrganisationHeader";
import { TransactionsTable } from "@/components/TransactionsTable";

interface TableEvent {
  fromOrganisationName: string;
  fromRegistrationId: string;
  toOrganisationName: string;
  toRegistrationId: string;
  numberOfToken: string;
  timestamp: string;
}

export default function PastTransactionsPage() {
  const contractAddress = tokenContractAddress as Address;
  const client = usePublicClient();
  const { address } = useAccount();
  const [tableEvents, setTableEvents] = useState<TableEvent[]>([]);

  const getPastEvents = async () => {
    const [fromEvents, toEvents] = await Promise.all([
      client?.getContractEvents({
        address: contractAddress,
        abi: CarbonNexToken.abi,
        eventName: "Transaction",
        args: { from: address },
        fromBlock: 0n,
      }),
      client?.getContractEvents({
        address: contractAddress,
        abi: CarbonNexToken.abi,
        eventName: "Transaction",
        args: { to: address },
        fromBlock: 0n,
      }),
    ]);

    const combinedEvents = [...(fromEvents || []), ...(toEvents || [])];

    // Format the events with timestamp conversion
    return combinedEvents.map((event: any) => ({
      from: event.args.from,
      to: event.args.to,
      numberOfToken: Number(event.args.numberOfToken).toString(),
      timestamp: new Date(Number(event.args.timestamp) * 1000).toISOString(),
    }));
  };

  const obtainTableFormat = async () => {
    const organisations = await getOrganisations();
    const events = await getPastEvents();

    if (!organisations) return;

    const addressToOrganisationMap = organisations.reduce((acc, org) => {
      acc[org.address.toLowerCase()] = {
        organisation_name: org.organisation_name,
        registration_id: org.registration_id,
        address: org.address,
      };
      return acc;
    }, {} as Record<string, { organisation_name: string; registration_id: string; address: string }>);

    const passTableEvents = events.map((event) => {
      const fromOrg = addressToOrganisationMap[event.from.toLowerCase()];
      const toOrg = addressToOrganisationMap[event.to.toLowerCase()];

      return {
        fromOrganisationName: fromOrg?.organisation_name || "Unknown",
        fromRegistrationId: fromOrg?.registration_id || "N/A",
        toOrganisationName: toOrg?.organisation_name || "Unknown",
        toRegistrationId: toOrg?.registration_id || "N/A",
        numberOfToken: event.numberOfToken,
        timestamp: event.timestamp,
      };
    });

    passTableEvents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setTableEvents(passTableEvents);
  };

  useEffect(() => {
    if (address) {
      obtainTableFormat();
    }
  }, [address]);

  return (
    <div>
      <div>
        <OrganisationHeader />
      </div>
      <div className="px-10 py-5">
        <span className="text-2xl font-semibold text-foreground">
          View Past Transactions Here
        </span>
      </div>
      <div>
        <TransactionsTable transactions={tableEvents}/>
      </div>
    </div>
  );
}
