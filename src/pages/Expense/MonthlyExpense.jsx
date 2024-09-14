import BranchSamitySelector from "../../component/branchSamitySelector";
import ExpenseNav from "./ExpenseNav/ExpenseNav";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMutationHook from "../../../hooks/useMutationHook";
import { addMonthlyExpense } from "../../../api/admin";
import ExpenseHeadSelector from "./ExpenseHeadSelector";
import { useUserType } from "../../../hooks/userContext";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
const initialState = {
  branchId: "",
  samityId: "",
  date: new Date(),
  headId: "",
  amount: "",
  remarks: "",
  payFrom: null,
};

const MonthlyExpense = () => {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(date),
    }));
  };

  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(addMonthlyExpense, {
      onSuccess: () => {
        setFormData(initialState);
        swal("Monthly Expense Added Successfully!");
      },
    });
  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      ...formData,
      by: user,
    };
    mutate(newData);
  };

  return (
    <div>
      <section>
        <ExpenseNav />
      </section>
      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Monthly Expense{" "}
        </h1>
        <form className="my-8" action="">
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            <BranchSamitySelector callBackFn={setFormData} />
            <ExpenseHeadSelector callBackFn={setFormData} />
            <DrawerBankCashSelector
              callBackFn={setFormData}
              samityId={formData.samityId}
              text={"Pay From"}
            />
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="date">
                Date(DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleChangeDate}
                className="border-2 hover:border-teal-500 rounded "
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="amount">
                Amount
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="amount"
                name="amount"
                onChange={handleChange}
                type="number"
                placeholder="Enter Amount"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="remarks">
                {" "}
                Remarks :
              </label>
              <textarea
                className="input input-bordered hover:border-teal-500 "
                id="remarks"
                name="remarks"
                onChange={handleChange}
                cols="10"
                rows="1"
              ></textarea>
            </div>
          </section>
          {isError ? errorMessage : null}
          <div className="w-full flex justify-center  mt-12">
            <button
              className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MonthlyExpense;
