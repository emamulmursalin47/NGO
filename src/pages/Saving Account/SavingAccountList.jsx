import { useEffect, useState } from "react";
import BranchSamitySelector from "../../component/branchSamitySelector";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import { useSearchParams } from "react-router-dom";
import { searchDepositAccountByBranchAndSamity } from "../../../api/admin";
import SavingAccountListView from "./SavingAccountListView";
import { useQuery } from "@tanstack/react-query";

const initialData = {
  branchId: null,
  samityId: null,
};

const SavingAccountList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialData);

  const { data, refetch } = useQuery({
    queryKey: ["saving-account-list", formData.branchId, formData.samityId],
    queryFn: () => searchDepositAccountByBranchAndSamity(formData),
    initialData: null,
    enabled: !!formData.branchId && !!formData.samityId,
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
      console.log(1);
      //   refetch();
    }
  }, [formData, setSearchParams, refetch]);

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  return (
    <div>
      <section>
        <SavingAccountNav />
      </section>
      <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 pl-2 mb-4">
        Saving Account List
      </h1>
      <section className=" flex flex-col md:flex-row p-2 gap-2 items-center max-w-5xl mx-auto">
        <BranchSamitySelector callBackFn={handleFormDataChange} />
      </section>
      <section className="max-w-5xl mx-auto p-2">
        <div className="max-w-5xl mx-auto bg-teal-700 text-white py-4 md:mt-8 ">
          <tr className="grid grid-cols-4 text-xs md:text-base md:grid-cols-5  items-center justify-center gap-1 text-start">
            <th>Member Name</th>
            <th>Opening Date</th>
            <th className="hidden md:block">Total Deposit</th>
            <th className="">Balance</th>
            <th>Action</th>
          </tr>
        </div>
        <div>
          {data?.data?.map((item, idx) => (
            <SavingAccountListView data={item} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SavingAccountList;
