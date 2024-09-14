import React, { useState } from "react";
import ReportNav from "./ReportNav/ReportNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMutationHook from "../../../hooks/useMutationHook";
import { getIncomeVsExpense } from "../../../api/admin";
import IncomeExpenseTable from "./IncomeVsExpenses/Table";

const initialState = {
  from: null,
  to: null,
};
const IncomeVsExpense = () => {
  const [filteredData, setFilteredData] = useState(initialState);
  const [incomeVsExpense, setIncomeVsExpense] = useState(null);

  function handleChangeFrom(date) {
    setFilteredData((prev) => ({ ...prev, from: date }));
  }
  function handleChangeTo(date) {
    setFilteredData((prev) => ({ ...prev, to: date }));
  }
  const { mutate } = useMutationHook(getIncomeVsExpense, {
    onSuccess: (data) => {
      console.log(data);
      setIncomeVsExpense(data);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(filteredData);
    mutate(filteredData);
  }
  return (
    <div>
      <section>
        <ReportNav />
      </section>
      {/* Filter */}
      <section className="flex w-full items-center justify-center ">
        <div className="flex items-center gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="membership_fee ">
              From (DD/MM/YYYY):
            </label>
            <DatePicker
              selected={filteredData.from}
              onChange={handleChangeFrom}
              className="input input-bordered input-sm  hover:border-teal-500 w-full"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="membership_fee ">
              To (DD/MM/YYYY):
            </label>
            <DatePicker
              selected={filteredData.to}
              onChange={handleChangeTo}
              className="input input-bordered input-sm  hover:border-teal-500 w-full"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Filter
            </button>
          </div>
        </div>
      </section>
      <h1>Income vs Expense</h1>
      {incomeVsExpense ? <IncomeExpenseTable data={incomeVsExpense} /> : null}
    </div>
  );
};

export default IncomeVsExpense;
