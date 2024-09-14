import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { ngoLoanPayment, ngoLoanTransaction } from "../../../api/admin";
import { useState } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import toast from "react-hot-toast";
import LoanPayDetailsList from "./LoanPayDetailsList";
import Stats from "../../component/Stats";
import BranchSamitySelector from "../../component/branchSamitySelector";
import BankSelector from "../../component/bankSelector";
import { useUserType } from "../../../hooks/userContext";
const initialState = {
  ngoLoanId: null,
  amount: 0,
  date: new Date(),
  remark: "",
};

const LoanPayDetails = () => {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();

  const [drawerCash, setDrawerCash] = useState(null);
  const [bankCash, setBankCash] = useState(null);
  const [cashType, setCashType] = useState("drawer");
  const { id } = useParams();
  const { data, isFetched } = useQuery({
    queryKey: [`nog-loan-${id}`],
    queryFn: () => ngoLoanTransaction(id),
    initialData: [],
  });

  const { mutate } = useMutationHook(ngoLoanPayment, {
    key: [`nog-loan-${id}`],
    onSuccess: () => {
      toast.success("Done!");
    },

    onError: (data) => {
      toast.error("Something went wrong ");
    },
  });
  function handleChange(e) {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleCashTypeChange(e) {
    setCashType(e.target.value);
    setDrawerCash(null);
    setBankCash(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...formData,
      ngoLoanId: id,
    };
    mutate(data);
  }
  const totalAmount = isFetched ? data.ngoLoanDetails.totalAmount : null;
  const totalPaid = isFetched ? data.ngoLoanDetails.totalPaid : null;
  const perInstallment = isFetched
    ? data.ngoLoanDetails.perInstallment.toFixed(2)
    : null;
  const statsData = { totalAmount, totalPaid, perInstallment, isFetched };
  return (
    <div className="max-w-5xl mx-auto ">
      <h1 className="  text-lg md:rounded-md bg-teal-700 text-white font-normal  mx-2  mt-4  p-3 text-center ">
        Name Of The Institute:{" "}
        <span className="text-teal-100 text-2xl pl-2 ">
          {" "}
          {isFetched ? data.ngoLoanDetails.nameOfInstitute : null}
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-4">
        <Stats data={statsData} />
      </div>

      {/* Pay From Section   */}



      <div className="col-span-3">
        <div className="flex flex-col gap-1 mb-4 mt-10">
          <label className="font-medium" htmlFor="cashType">
            Send Money To (Select One):
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="cashType"
                value="drawer"
                checked={cashType === "drawer"}
                onChange={handleCashTypeChange}
              />
              Drawer Cash
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="cashType"
                value="bank"
                checked={cashType === "bank"}
                onChange={handleCashTypeChange}
              />
              Bank Cash
            </label>
          </div>
        </div>

        <div className=" flex flex-row max-w-5xl">
          {cashType === "drawer" && (
            <div className="flex w-full mb-12">
              <BranchSamitySelector callBackFn={setDrawerCash} />
            </div>
          )}
          {cashType === "bank" && (
            <div className="w-full mb-12">
              <BankSelector callBackFn={setBankCash} />
            </div>
          )}
        </div>



      </div>






      {/* <div>
        <h1 className="text-xl">Pay From Drawer Cash</h1>
        <div className="flex ">
          <BranchSamitySelector callBackFn={setDrawerCash} />
        </div>
        <h1>Pay From</h1>
        <BankSelector callBackFn={setBankCash} />
      </div> */}


      <div>
        <div className="max-w-5xl mx-auto">
          <div className=" bg-teal-700 text-white py-4 mx-1 rounded-t-md  ">
            <tr className="grid grid-cols-3 md:grid-cols-5  items-center justify-center gap-1 text-start ">
              <th>Key</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </div>
        </div>
        {isFetched
          ? data.transactionDetails.map((data, idx) => (
            <LoanPayDetailsList
              data={data}
              key={idx}
              index={idx}
              drawerCash={drawerCash}
              bankCash={bankCash}
              user={user}
            />
          ))
          : null}
      </div>
    </div>
  );
};

export default LoanPayDetails;
