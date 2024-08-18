"use client";
import { OrganisationHeader } from "@/components/OrganisationHeader";
import { useAccount, useReadContract } from "wagmi";
import { Address } from "viem";
import { tokenContractAddress } from "@/utils/smartContractAddress";
import CarbonNexToken from "@/abi/CarbonNexToken.json";
import { ReadContractErrorType } from "viem";
import { NumberInput } from "@/components/NumberInput";
import { Button } from "@/components/ui/button";
import {
  getListing,
  addListing,
  removeListing,
  updateListing,
} from "@/database/function";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { address } = useAccount();
  const [numberOfTokens, setNumberOfTokens] = useState(0);
  const { toast } = useToast();
  const [newListing, setNewListing] = useState(true);
  const [existingListingToken, setExistingListingToken] = useState(0);
  const [existingListingUpdated, setExistingListingUpdated] = useState(false);

  const contractAddress = tokenContractAddress as Address;

  const { data, error } = useReadContract({
    address: contractAddress,
    abi: CarbonNexToken.abi,
    functionName: "balanceOfUser",
    account: address,
  }) as { data: bigint; error: ReadContractErrorType };

  useEffect(() => {
    async function fetchListing() {
      const listing = await getListing(Number(localStorage.getItem("id")));
      if (listing) {
        if (listing.length > 0) {
          setNewListing(false);
          setExistingListingToken(listing[0].available_amount);
        } else {
          setNewListing(true);
        }
      } else {
        toast({
          title: "Error obtaining listing data.",
        });
      }
    }
    fetchListing();
  }, [newListing, existingListingUpdated]);

  async function addToMarketplace() {
    if (numberOfTokens > 0) {
      if (newListing) {
        await addListing(numberOfTokens, Number(localStorage.getItem("id")));
        toast({
          title: "Successfully added listing.",
          description: `${numberOfTokens} listed on the marketplace.`,
        });
        setNewListing(false);
      } else {
        await updateListing(numberOfTokens, Number(localStorage.getItem("id")));
        toast({
          title: "Successfully updated listing.",
          description: `${numberOfTokens} listed on the marketplace.`,
        });
        setExistingListingUpdated((prev) => !prev);
      }
    } else {
      toast({
        title: "You have to list more than 1 tokens",
      });
    }
  }

  async function deleteListing() {
    await removeListing(Number(localStorage.getItem("id")));
    toast({
      title: "Successfully deleted listing.",
      description: "Your listing has been removed from the marketplace.",
    });
    setNewListing(true);
  }

  return (
    <div>
      <div>
        <OrganisationHeader />
      </div>
      <div className="px-32 pt-10 pb-5">
        <span className="text-2xl font-semibold text-foreground">
          Sell Your CarbonNexToken
        </span>
      </div>
      <div className="px-32 pb-5">
        <span className="text-lg text-foreground">
          Balance: CNX {Number(data).toString()}
        </span>
      </div>
      <div className="px-32 pb-5">
        <span className="text-sm text-foreground">
          {newListing
            ? "Create new listing"
            : `Update existing listing: CNX ${existingListingToken}`}
        </span>
      </div>
      <div className="px-32 pb-5">
        <NumberInput
          limit={Number(data)}
          value={numberOfTokens}
          setValue={setNumberOfTokens}
        />
      </div>
      <div className="px-32 py-5">
        <Button onClick={addToMarketplace} className="w-full" type="submit">
          {newListing ? "Sell" : "Update"}
        </Button>
      </div>
      {!newListing && (
        <div className="px-32">
          <Button
            onClick={deleteListing}
            variant="destructive"
            className="w-full"
            type="button"
          >
            Delete Listing
          </Button>
        </div>
      )}
    </div>
  );
}
