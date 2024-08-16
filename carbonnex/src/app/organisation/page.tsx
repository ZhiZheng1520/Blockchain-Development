"use client";
import { OrganisationHeader } from "@/components/OrganisationHeader";
import { GoOrganization } from "react-icons/go";
import { RiRegisteredLine } from "react-icons/ri";
import { IoIosCode } from "react-icons/io";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useAccount, useReadContract } from "wagmi";
import { Address } from "viem";
import { tokenContractAddress } from "@/utils/smartContractAddress";
import CarbonNexToken from "@/abi/CarbonNexToken.json";
import { ReadContractErrorType } from "viem";

export default function Page() {
  const { address } = useAccount();

  const contractAddress = tokenContractAddress as Address;

  const { data, error } = useReadContract({
    address: contractAddress,
    abi: CarbonNexToken.abi,
    functionName: "balanceOfUser",
    account: address,
  }) as { data: bigint; error: ReadContractErrorType };

  return (
    <div>
      <div>
        <OrganisationHeader />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[35rem]">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <GoOrganization className="w-28 h-28" />
            <div className="grid gap-2">
              <div className="text-5xl font-semibold">
                {localStorage.getItem("organisation_name")}
              </div>
              <div className="text-xl">{localStorage.getItem("role")}</div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <RiRegisteredLine className="w-10 h-10" />
              <span className="text-xl ">
                {localStorage.getItem("registration_id")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoIosCode className="w-10 h-10" />
              <span className="text-xl">{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineAccountBalanceWallet className="w-10 h-10" />
              <span className="text-xl">CNX {Number(data).toString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
