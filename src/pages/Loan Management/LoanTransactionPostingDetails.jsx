import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getLoanTransactionDetailsById,
  payLoanAccount,
  payLoanFromDepositAccount,
} from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import toast from "react-hot-toast";
import { useState } from "react";
import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import { useUserType } from "../../../hooks/userContext";
import { LoanDetailsCard } from "./LoanDetailsCard";
import { LoanTransactionDetailsTable } from "./LoanTransactionDetailsTable";
import { PayFromDepositAccounts } from "./PayFromDepositAccounts";

const initialData = {
  amount: 0,
  addFineAmount: 0,
  fineReason: "",
  payFineAmount: 0,
  by: null,
  payFrom: null,
  date: new Date(),
};

const LoanTransactionPostingDetails = () => {
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [`loan-transaction-${id}`],
    queryFn: () => getLoanTransactionDetailsById(id),
    initialData: null,
  });
  const { mutate } = useMutationHook(payLoanAccount, {
    key: [`loan-transaction-${id}`],
    onSuccess: () => {
      toast.success("Done");
    },
    onError: () => {
      toast.error("Something went wrong with your transaction");
    },
  });
  function handleChange(e) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let data = { ...formData, loanId: id, by: user };
    mutate(data);
  }

  return (
    <>
      <section>
        <LoanManagementNav />
      </section>
      <section>
        {data ? <LoanDetailsCard data={data.loanAccountDetails} /> : null}
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2">
          Pay Loan
        </h1>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 my-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Amount</label>
              <input
                onChange={handleChange}
                type="number"
                name="amount"
                className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="addFineAmount">Add Fine</label>
              <input
                onChange={handleChange}
                type="number"
                name="addFineAmount"
                className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Fine Reason</label>
              <input
                onChange={handleChange}
                type="text"
                name="fineReason"
                className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Pay Fine Amount</label>
              <input
                onChange={handleChange}
                type="number"
                name="payFineAmount"
                className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
              />
            </div>
          </div>
          <DrawerBankCashSelector
            samityId={data?.loanAccountDetails?.samityId}
            callBackFn={setFormData}
            text="Add Money To"
          />

          <div className="w-full flex justify-center  mt-12">
            <button
              className="bg-teal-600 hover:bg-teal-700 px-20 py-2 mb-4 rounded font-medium  text-white"
              onClick={handleSubmit}
            >
              Add Transaction
            </button>
          </div>
        </form>
      </section>
      <section>
        <div>
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2">
            Pay from Savings Account
          </h1>
        </div>

        {data ? (
          <PayFromDepositAccounts
            samityId={data?.loanAccountDetails?.samityId}
            data={data.depositAccounts}
            loanId={id}
            user={user}
          />
        ) : null}
      </section>
      <section className="m-10 w-full md:max-w-5xl mx-auto">
        <table className="w-full mt-12 ">
          <tr className="grid grid-cols-2  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-5 items-center justify-center gap-1 text-center">
            <th>Loan Id</th>
            <th>Amount</th>
            <th className="hidden md:block">Fine Amount</th>
            <th className="hidden md:block">Fine Reason</th>
            <th className="hidden md:block">Date</th>
          </tr>

          {data
            ? data.transactionDetails.map((data, idx) => (
                <LoanTransactionDetailsTable key={idx} data={data} />
              ))
            : null}
        </table>
      </section>
    </>
  );
};

export default LoanTransactionPostingDetails;
