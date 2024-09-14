import React, { useState } from "react";
import IncomeNav from "./IncomeNav/IncomeNav";
import useMutationHook from "../../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import { createIncomeHead, getAllIncomeHead } from "../../../api/admin";
import toast from "react-hot-toast";
function AddIncomeHead() {
  const [incomeHead, setIncomeHead] = useState("");
  const { mutate } = useMutationHook(createIncomeHead, {
    key: ["income-head"],
    onSuccess: () => {
      toast.success("Income head added successfully");
    },
  });
  const { data } = useQuery({
    queryKey: ["income-head"],
    queryFn: getAllIncomeHead,
    initialData: [],
  });
  function handleChange(e) {
    const { value } = e.target;
    setIncomeHead(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    mutate({ head: incomeHead });
  }
  console.log(data);

  return (
    <div>
      <section>
        <IncomeNav />
      </section>
      {/* Add income head */}
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto   border-b-4 pb-2 my-4 ">
          Income Head
        </h1>
        <div className="w-full flex justify-between gap-4">
          <input type="text" className="input input-sm input-bordered w-full " placeholder="Add Income Head Here.." onChange={handleChange} />
          <button className="btn btn-sm hover:bg-teal-500 hover:text-white " onClick={handleSubmit}>Submit</button>
        </div>
        {/* Income Head List */}
        <section className="mt-4">
          <div className="grid grid-cols-1 gap-2 ">

            {data.length ? (
              // data.map((data, idx) => <div className="bg-teal-500 rounded mb-1 text-white font-medium p-2 text-center " key={idx}>{data.head}</div>)
              data.map((data, idx) => <div className=" flex items-center gap-2 m-2" key={idx}>
                <p className="p-1 px-3 mb-2 w-14 bg-teal-500 text-white">{idx + 1}</p>
                <p className=" bg-base-200 p-1 pl-4 mb-2 w-full">{data.head}</p>
              </div>)
            ) : (
              <div className="text-center bg-red-400 p-2 w-full rounded m-4">No data</div>
            )}
          </div>
        </section>
      </section>



    </div>
  );
}

export default AddIncomeHead;
