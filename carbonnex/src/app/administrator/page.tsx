"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { tokenContractAddress } from "@/utils/smartContractAddress";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Address } from "viem";
import CarbonNexToken from "@/abi/CarbonNexToken.json";
import { insertOrganisation, checkAddressExist } from "@/database/function";
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/AdminHeader";

const formSchema = z.object({
  organisation_name: z
    .string()
    .min(5, {
      message: "Organisation name must be at least 5 characters.",
    })
    .max(50, { message: "Organisation name must be at most 50 characters." }),
  registration_id: z
    .string()
    .min(5, {
      message: "Registration ID must be at least 5 characters.",
    })
    .max(50, { message: "Registration ID must be at most 50 characters." }),
  address: z.string().length(42, {
    message: "Address must be 42 characters long.",
  }),
});

export default function AdminPage() {
  const { toast } = useToast();
  const { address } = useAccount();
  const contractAddress = tokenContractAddress as Address;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organisation_name: "",
      registration_id: "",
      address: "",
    },
  });

  const { error: estimateError } = useSimulateContract({
    address: contractAddress,
    abi: CarbonNexToken.abi,
    account: address,
    functionName: "mintForNewUser",
    args: [formValues?.address],
  });

  const { data, writeContract } = useWriteContract();

  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt(
    {
      hash: data,
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormValues(values);
  }

  useEffect(() => {
    const dbCheckAddress = async () => {
      if (formValues) {
        const addressExist = await checkAddressExist(formValues.address);
        if (addressExist) {
          toast({
            title: "Address already registered.",
          });
          setFormValues(undefined);
          return;
        } else {
          writeContract({
            address: contractAddress,
            abi: CarbonNexToken.abi,
            account: address,
            functionName: "mintForNewUser",
            args: [formValues.address],
          });
        }
      }
    };

    if (formValues) {
      if (estimateError) {
        toast({
          title: "Registration failed during estimate.",
          description: `${estimateError.cause}`,
        });
        setFormValues(undefined);
        return;
      }
      dbCheckAddress();
    }
  }, [formValues]);

  useEffect(() => {
    const dbInsert = async () => {
      if (formValues) {
        await insertOrganisation(
          formValues.organisation_name,
          formValues.registration_id,
          formValues.address
        );
      }
    };
    if (txSuccess) {
      dbInsert();
      toast({
        title: "Registration successful.",
        description: `Organisation name: ${formValues?.organisation_name}\nRegistration ID: ${formValues?.registration_id}`,
      });
      setFormValues(undefined);
    } else if (txError) {
      toast({
        title: "Registration failed during transaction.",
        description: `${txError.cause}`,
      });
      setFormValues(undefined);
    }
  }, [txSuccess, txError]);

  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="px-32 pt-10 pb-5">
        <span className="text-2xl font-semibold text-foreground">
          Insert Organisation
        </span>
      </div>
      <div className="px-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="organisation_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organisation name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organisation name" {...field} />
                  </FormControl>
                  <FormDescription>This the organisation name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registration_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Registration ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    This the organisation's registration ID.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This the organisation's address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
