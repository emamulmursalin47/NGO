import { useState, useEffect } from "react";
import BranchSamitySelector from "../../component/branchSamitySelector";
import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import { getAllLoanAccountByBranchIdAndSmityId } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import LoanCard from "../../component/LoanCard";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const initialState = {
  branchId: null,
  samityId: null,
  paymentTerm: null,
};
const LoanAccountList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialState);
  const [loanList, setLoanList] = useState([]);
  const { data } = useQuery({
    queryKey: ["loan-account-list"],
    queryFn: () => getAllLoanAccountByBranchIdAndSmityId(formData),
    enabled: formData.branchId && formData.samityId ? true : false,
    initialData: null,
  });
  useEffect(() => {
    const branchId = searchParams.get("branchId");
    const samityId = searchParams.get("samityId");
    if (branchId && samityId) {
      setFormData({ branchId, samityId });
    }
    if (formData.branchId && formData.samityId) {
      setSearchParams({
        branchId: formData.branchId,
        samityId: formData.samityId,
      });
    }
  }, []);
  // [formData.branchId, formData.samityId]
  return (
    <div>
      <section>
        <LoanManagementNav />
      </section>
      <section className="p-4 w-full flex flex-col md:flex-row">
        <BranchSamitySelector callBackFn={setFormData} />
        {/* <div className="flex flex-col gap-1">
          <label className="font-medium " htmlFor="payment_term">
            Payment Term :
          </label>
          <select
            onChange={handleChange}
            name="paymentTerm"
            className=" input input-bordered input-sm hover:border-teal-500 "
          >
            <option disabled>Select a Value</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Fortnightly">Fortnightly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div> */}
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {data
          ? data.map((loan, idx) => <LoanCard data={loan} key={idx} />)
          : null}
      </section>
    </div>
  );
};

export default LoanAccountList;
