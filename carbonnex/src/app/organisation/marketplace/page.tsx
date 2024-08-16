"use client";
import { OrganisationHeader } from "@/components/OrganisationHeader";
import { getAllListingsOrganisations } from "@/database/function";
import { useState, useEffect } from "react";
import { ListingsTable } from "@/components/ListingsTable";

export default function MarketplacePage() {
  const [listingData, setListingData] = useState<any>();
  const [toggleRefresh, setToggleRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllListingsOrganisations(
        Number(localStorage.getItem("id"))
      );
      setListingData(data);
    };

    fetchData();
  }, [toggleRefresh]);

  return (
    <div>
      <div>
        <OrganisationHeader />
      </div>
      <div className="px-10 py-5">
        <span className="text-2xl font-semibold text-foreground">
          Buy Tokens Here
        </span>
      </div>
      <div>
        <ListingsTable listings={listingData} setToggleRefresh={setToggleRefresh}/>
      </div>
    </div>
  );
}
