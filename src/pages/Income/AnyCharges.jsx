import IncomeNav from "./IncomeNav/IncomeNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import useMutationHook from "../../../hooks/useMutationHook";
import { useState } from "react";
import { getIncome } from "../../../api/admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const initalState = {
  date: new Date(),
};

const AnyCharges = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const { mutate, isPending } = useMutationHook(getIncome, {
    onSuccess: (data) => {
      console.log(data);
      setData(data.data);
    },
  });
  function handleSubmit(event) {
    event.preventDefault();

    mutate(date);
  }
  // console.log(income);
  //asif

  return (
    <div>
      <section>
        <IncomeNav />
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-1 mt-4">
          <label className="font-medium" htmlFor="membership_fee ">
            Select Date:
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered input-sm  hover:border-teal-500 w-full"
            dateFormat="dd/MM/yyyy"
            required
          />
          <button
            className="btn btn-sm w-fit bg-teal-500 text-white hover:bg-teal-700 mx-auto mt-4"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </section>

      <section>
        {data
          ? data.incomeHeadTransaction.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}
        {data
          ? data.loanProfit.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}{" "}
        {data
          ? data.memberProfit.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}
      </section>

      <section className="max-w-5xl mx-auto p-2">
        <div className="max-w-5xl mx-auto bg-teal-700 text-white py-4 md:mt-8 ">
          <tr className="grid grid-cols-3 text-xs md:text-base md:grid-cols-3  items-center justify-center gap-1 text-start">
            <th>Serial No</th>
            <th>Income Head</th>
            <th>Profit Amount</th>
          </tr>
          <tr>
            <td></td>
          </tr>
        </div>
        {/* <div>
          {data
            ? data.data.map((data, idx) => (
              <SavingAccountListView data={data} key={idx} />
            ))
            : null}
        </div> */}
      </section>
    </div>
  );
};

export default AnyCharges;
