import { useState } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import { payLoanFromDepositAccount } from "../../../api/admin";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import toast from "react-hot-toast";
const initialState = {
  payFrom: null,
};
export const PayFromDepositAccounts = ({ data, loanId, user, samityId }) => {
  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [id, setId] = useState(null);
  const { mutate } = useMutationHook(payLoanFromDepositAccount, {
    key: [`loan-transaction-${loanId}`],
    onSuccess: () => {
      toast.success("Done");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      depositAccountId: id,
      loanAccountId: loanId,
      amount: amount,
      payFrom: formData.payFrom,
      by: user,
    };
    if (!id) {
      return toast.error("Please Choose A Account");
    }
    mutate(body);
  }

  function handleChange(e) {
    const { value } = e.target;
    setAmount(Number(value));
  }

  return (
    <div>
      {data.map((data, idx) => (
        <DepositAccountCard data={data} key={idx} callBackFn={setId} />
      ))}

      <div className="m-10 flex flex-col md:flex-row w-full gap-4 max-w-5xl mx-auto p-2">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Account ID</label>
          <input
            disabled
            placeholder={id}
            type="number"
            name="acountid"
            className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
          />
        </div>
      </div>
      <DrawerBankCashSelector
        samityId={samityId}
        callBackFn={setFormData}
        text={"Add Money To"}
      />
      <div className="w-full flex justify-center  mt-12">
        <button
          className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium  text-white"
          onClick={handleSubmit}
        >
          Pay From Loan
        </button>
      </div>
    </div>
  );
};
function DepositAccountCard({ data, callBackFn }) {
  const { _id, balance } = data;

  return (
    <section className="max-w-5xl mx-auto p-2">
      <div
        className="border-2 flex flex-col md:flex-row md:justify-evenly  mt-8"
        onClick={() => callBackFn(_id)}
      >
        <p className="font-bold m-4">
          Account Id: <span className="font-bold text-emerald-500">{_id}</span>
        </p>
        <p className="font-bold m-4">
          Total Balance:{" "}
          <span className="font-bold text-emerald-500">{balance}</span>
        </p>
      </div>
    </section>
  );
}
