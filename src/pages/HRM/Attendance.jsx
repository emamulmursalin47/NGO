import { useState } from "react";
import HRMNav from "./HRMNav/HRMNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAttendeesSheet } from "../../../api/admin";
import AttendanceTable from "../../component/AttendanceTable";
import toast from "react-hot-toast";
const initialState = {
  date: new Date(),
  status: "",
  branchId: "",
  samityId: "",
};

const Attendance = () => {
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState({ data: [], attendance: [] });
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(date),
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { branchId, samityId, date } = formData;
    if (!branchId || !samityId || !date) {
      return toast.error("Please Select Branch , Samity and Date");
    }
    const data = await getAttendeesSheet(branchId, samityId, date);
    setData(data);
  };

  return (
    <div>
      <section>
        <HRMNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Attendance
        </h1>

        <form className="my-8" action="">
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto justify-evenly items-center gap-4 ">
            <BranchSamitySelector callBackFn={setFormData} />

            <div className="flex flex-col gap-1 ">
              <label className="font-medium" htmlFor="date">
                Date(DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleChangeDate}
                className=" hover:border-teal-500 rounded input input-bordered input-sm w-full"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </form>
      </section>
      <div className="w-full flex justify-center  mt-12">
        <button
          className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {/* Attendance Section */}

      <div className="m-12">

        {data.data.length ? (
          <AttendanceTable
            data={data.data}
            attendance={data.attendance}
            other={formData}
          />
        ) : (
          "No Data To Show"
        )}

      </div>


    </div>
  );
};

export default Attendance;
