import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NumberInput } from "./NumberInput";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleBuy } from "@/database/function";
import { Dispatch, SetStateAction } from "react";
import { Address } from "viem";
import CarbonNexToken from "@/abi/CarbonNexToken.json";
import { tokenContractAddress } from "@/utils/smartContractAddress";
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { useToast } from "./ui/use-toast";

interface Listing {
  listing_id: number;
  organisation_id: number;
  available_amount: number;
  datetime: string;
  organisation_name: string;
  registration_id: string;
  address: string;
}

interface ListingsTableProps {
  listings: Listing[];
  setToggleRefresh: Dispatch<SetStateAction<boolean>>;
}

export function ListingsTable({
  listings = [],
  setToggleRefresh,
}: ListingsTableProps) {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [listing, setListing] = useState<Listing>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const contractAddress = tokenContractAddress as Address;

  const { error: estimateError } = useSimulateContract({
    address: contractAddress,
    abi: CarbonNexToken.abi,
    account: address,
    functionName: "buyToken",
    args: [listing?.address, tokenAmount],
  });

  const { data, writeContract } = useWriteContract();

  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt(
    {
      hash: data,
    }
  );

  useEffect(() => {
    if (listing) {
      if (estimateError) {
        toast({
          title: "Transaction failed during estimate.",
          description: `${estimateError.cause}`,
        });
        setListing(undefined);
        return;
      }

      writeContract({
        address: contractAddress,
        abi: CarbonNexToken.abi,
        account: address,
        functionName: "buyToken",
        args: [listing.address, tokenAmount],
      });
    }
  }, [listing]);

  useEffect(() => {
    const performBuy = async () => {
      if (listing) {
        const newAmount = listing.available_amount - tokenAmount;
        await handleBuy(newAmount, listing.listing_id);
      }
    };

    if (txSuccess) {
      performBuy();
      toast({
        title: "Transaction Successful",
        description: `${tokenAmount} CNX successfully bought.`,
      });
      setListing(undefined);
      setIsDialogOpen(false);
      setToggleRefresh((prev) => !prev);
    } else if (txError) {
      toast({
        title: "Transaction failed.",
        description: `${txError.cause}`,
      });
      setListing(undefined);
      setIsDialogOpen(false);
    }
  }, [txSuccess, txError]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Organisation Name</TableHead>
          <TableHead>Registration ID</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Available Amount</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(listings) &&
          listings.map((listing) => (
            <TableRow
              key={listing.listing_id}
              data-listing-id={listing.listing_id}
              data-organisation-id={listing.organisation_id}
            >
              <TableCell>{listing.organisation_name}</TableCell>
              <TableCell>{listing.registration_id}</TableCell>
              <TableCell>{listing.address}</TableCell>
              <TableCell>{listing.available_amount}</TableCell>
              <TableCell>
                {new Date(
                  new Date(listing.datetime).getTime() -
                    new Date().getTimezoneOffset() * 60000
                ).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </TableCell>
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setTokenAmount(0);
                      }}
                    >
                      Buy
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="mb-2">Buy Token</DialogTitle>
                      <DialogDescription>
                        Choose the amount of CarbonNexToken you wish to buy.{" "}
                        <br />
                        Max: CNX {listing.available_amount}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <NumberInput
                        limit={listing.available_amount}
                        value={tokenAmount}
                        setValue={setTokenAmount}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          setListing(listing);
                        }}
                      >
                        Buy
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
