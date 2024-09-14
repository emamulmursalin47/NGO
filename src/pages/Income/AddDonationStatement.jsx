import IncomeNav from "./IncomeNav/IncomeNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUserType } from "../../../hooks/userContext";
import { useState } from "react";
import BranchSamitySelector from "../../component/branchSamitySelector";
import BankSelector from "../../component/bankSelector";
import { createDonationTransaction } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
const initialState = {
  from: "",
  date: new Date(),
  amount: "",
};
export default function AddDonationStatement() {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const [drawerCash, setDrawerCash] = useState(null);
  const [bankCash, setBankCash] = useState(null);
  const [cashType, setCashType] = useState("drawer"); // Default cash type
  const { mutate } = useMutationHook(createDonationTransaction, {
    onSuccess: () => {
      toast.success("Done!");
    },
  });

  function handleChangeDate(date) {
    setFormData((prev) => ({ ...prev, date: date }));
  }
  function handleChange(e) {
    const { value, name, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCashTypeChange(e) {
    setCashType(e.target.value);
    setDrawerCash(null);
    setBankCash(null);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let payFrom = null;
    if (cashType === "bank") {
      payFrom = {
        type: "bank",
        _id: bankCash?.bankId,
      };
    } else {
      payFrom = {
        type: "drawer",
        _id: drawerCash?.samityId,
      };
    }
    const data = {
      payFrom: payFrom,
      by: user,
      ...formData,
    };
    console.log(data);
    mutate(data);
  }
  return (
    <div>
      <section>
        <IncomeNav />
      </section>
      <section className="grid grid-cols-3 items-center justify-center gap-4 max-w-5xl mx-auto p-4">
        <div className="flex flex-col gap-1 col-span-1">
          <label className="font-medium" htmlFor="from">
            From:
          </label>
          <input
            onChange={handleChange}
            className="input input-bordered input-sm hover:border-teal-500"
            id="from"
            type="text"
            name="from"
            value={formData.from}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="font-medium" htmlFor="membership_fee">
            Date (DD/MM/YYYY):
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleChangeDate}
            className="input input-bordered input-sm hover:border-teal-500 w-full"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="font-medium" htmlFor="amount">
            Amount (BDT):
          </label>
          <input
            onChange={handleChange}
            className="input input-bordered input-sm hover:border-teal-500"
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
          />
        </div>

        {/* Send Money Container. */}
        <div className="col-span-3">
          <div className="flex flex-col gap-1 mb-10 mt-10">
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
              <div className="flex w-full mb-5">
                <BranchSamitySelector callBackFn={setDrawerCash} />
              </div>
            )}
            {cashType === "bank" && (
              <div className="w-full">
                <BankSelector callBackFn={setBankCash} />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto p-4 flex items-center justify-center">
        <button
          className="btn btn-sm hover:bg-teal-400 bg-teal-700 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
