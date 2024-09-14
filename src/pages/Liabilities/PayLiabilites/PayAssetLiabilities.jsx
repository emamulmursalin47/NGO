import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BranchSamitySelector from "../../../component/branchSamitySelector";
import {
  getExpenseLiabilityByBranchIdAndSmityId,
  getAssetLiabilityByBranchIdAndSmityId,
} from "../../../../api/admin";
import ExpenseLiabilitiesTable from "./ExpenseLiabilitiesTable";
import LiabilitiesNav from "../LiabilitiesNav/LiabilitiesNav";
import AssetLiabilitiesTable from "./AsetLiabilitiesTabel";

const initialState = {
  branchId: null,
  samityId: null,
};

export default function PayAssetLiabilities() {
  const [formData, setFormData] = useState(initialState);
  let [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["asset-liability"],
    queryFn: () => getAssetLiabilityByBranchIdAndSmityId(formData),
    enabled: !!formData.branchId && !!formData.samityId,
    initialData: null,
  });
  useEffect(() => {
    const branchId = searchParams.get("branchId");
    const samityId = searchParams.get("samityId");
    if (branchId && samityId) {
      setFormData({ branchId, samityId });
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.branchId && formData.samityId) {
      setSearchParams({
        branchId: formData.branchId,
        samityId: formData.samityId,
      });
    }
  }, [formData, setSearchParams]);

  return (
    <main>
      <section>
        <LiabilitiesNav />
      </section>
      <section className="m-2">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto pt-4 border-b-4 pb-2">
          Asset List
        </h1>

        <section className="flex flex-col md:flex-row gap-4 my-8 pb-8 md:max-w-5xl mx-auto items-center border-b-2">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <BranchSamitySelector callBackFn={setFormData} />
          </div>
        </section>

        <section className="md:m-2 xl:m-8">
          <div className="container mx-auto px-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="px-4 py-2 border-b">SL</th>
                  <th className="px-4 py-2 border-b">Head</th>
                  <th className="px-4 py-2 border-b">Total Price</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Pay</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.data.map((item, index) => (
                      <AssetLiabilitiesTable
                        key={index}
                        data={item}
                        idx={index}
                      />
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
