import { useState } from "react";
import HRMNav from "./HRMNav/HRMNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BranchSamitySelector from "../../component/branchSamitySelector";
import useMutationHook from "../../../hooks/useMutationHook";
import { salarySheetList } from "../../../api/admin";
import SalarySheetList from "./SalarySheetList";
const initialData = {
  branchId: "",
  samityId: "",
  date: new Date(),
};
const SalarySheet = () => {
  const [formData, setFormData] = useState(initialData);
  const { mutate } = useMutationHook(salarySheetList, {
    onSuccess: (data) => {
      console.log(data);
      setFormData(data)
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }
  console.log(formData);
  return (
    <div >
      <section>
        <HRMNav />
      </section>
      <div className="flex flex-col md:flex-row gap-4  justify-between items-center max-w-5xl mx-auto pt-4 px-2">
        <div className="flex flex-col w-full md:w-fit ">
          <label htmlFor="" className="font-medium mt-1">
            Year And Month
          </label>
          <DatePicker
            dateFormat="MM/yyyy"
            selected={formData.date}
            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
            showMonthYearPicker
            showFullMonthYearPicker
            className="input input-bordered input-sm  hover:border-teal-500 w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full">
          <BranchSamitySelector callBackFn={setFormData} />
        </div>

      </div>
      <div className="w-full flex justify-center items-center h-28">
        <button
          onClick={handleSubmit}
          className="btn btn-wide  bg-teal-500 text-white">
          Search
        </button>
      </div>
      <section>
        <div className="md:m-4 mt-0">
          <table className="w-full mt-12 ">
            <tr className="grid grid-cols-4  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-4 items-center justify-center gap-1 text-center">
              <th>Name</th>
              <th>Salary</th>
              <th>Total</th>

              <th className="hidden md:block">Action</th>
            </tr>

            {formData.length
              ? formData.map((data, key) => (
                <SalarySheetList key={key} data={data} />
              ))
              : null}
          </table>
        </div>
      </section>
    </div>
  );
};

export default SalarySheet;
