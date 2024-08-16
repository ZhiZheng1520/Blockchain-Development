"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function getSupabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function getOrganisations() {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from("all_organisations").select();

  if (error) {
    console.error("Error getting Organisations", error.message);
    return null;
  }

  return data;
}

export async function getLoginCredentials(address: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("all_organisations")
    .select()
    .eq("address", address);

  if (error) {
    console.error("Error Logging In", error.message);
    return null;
  }

  return data;
}

export async function insertOrganisation(
  organisation_name: string,
  registration_id: string,
  address: string
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from("all_organisations").insert({
    organisation_name,
    registration_id,
    address,
    role: "Organisation",
  });

  if (error) {
    console.error("Error inserting Organisations", error.message);
  }
}

export async function checkAddressExist(address: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("all_organisations")
    .select()
    .eq("address", address);

  if (error) {
    console.error("Error Querying Database", error.message);
    return true;
  }

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
}

export async function getListing(organisation_id: number) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("marketplace_listing")
    .select()
    .eq("organisation_id", organisation_id);

  if (error) {
    console.error("Error fetching data", error.message);
    return null;
  }

  return data;
}

export async function addListing(
  available_amount: number,
  organisation_id: number
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("marketplace_listing")
    .insert({ available_amount, organisation_id });

  if (error) {
    console.error("Error inserting marketplace", error.message);
  }
}

export async function updateListing(
  available_amount: number,
  organisation_id: number
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("marketplace_listing")
    .update({ available_amount })
    .eq("organisation_id", organisation_id);

  if (error) {
    console.error("Error updating marketplace", error.message);
  }
}

export async function removeListing(organisation_id: number) {
  const supabase = getSupabaseClient();

  await supabase
    .from("marketplace_listing")
    .delete()
    .eq("organisation_id", organisation_id);
}

export async function getAllListingsOrganisations(organisation_id: number) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("marketplace_listing")
    .select()
    .neq("organisation_id", organisation_id).select(`
  id, 
  organisation_id,
  available_amount,
  datetime,
  all_organisations ( organisation_name, registration_id, address )
`);

  if (error) {
    console.error("Error fetching data", error.message);
    return null;
  }

  if (data) {
    const flattenedData =
      data.map((item) => ({
        listing_id: item.id,
        organisation_id: item.organisation_id,
        available_amount: item.available_amount,
        datetime: item.datetime,
        organisation_name: item.all_organisations?.organisation_name ?? "",
        registration_id: item.all_organisations?.registration_id ?? "",
        address: item.all_organisations?.address ?? "",
      })) || [];

    return flattenedData;
  }
}

export async function handleBuy(new_amount: number, listing_id: number) {
  const supabase = getSupabaseClient();

  if (new_amount === 0) {
    await supabase.from("marketplace_listing").delete().eq("id", listing_id);
  } else {
    const { error } = await supabase
      .from("marketplace_listing")
      .update({ available_amount: new_amount })
      .eq("id", listing_id);

    if (error) {
      console.error("Error updating marketplace", error.message);
    }
  }
}
