import { useState } from "react";
import ManageDrawerCashNav from "./ManageDrawerCashNav/ManageDrawerCashNav";
import "react-datepicker/dist/react-datepicker.css";
import { createBank, getAllBank } from "../../../api/admin";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
const initialState = {
  name: "",
};

const AddBank = () => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const { data, isFetched } = useQuery({
    initialData: [],
    queryKey: ["bank"],
    queryFn: getAllBank,
  });
  const { mutate, isError, errorMessage, isPending } = useMutationHook(
    createBank,
    {
      onSuccess: () => {
        swal("Bank Added Successfully", "Press Ok To Continue", "success");
        setFormData(initialState);
      },
      key: ["bank"],
    }
  );
  console.log(data);
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <section>
        <ManageDrawerCashNav />
      </section>
      <section className=" max-w-5xl mx-auto">
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto p-2  pt-4 border-b-4 pb-2 ">
            Add Bank
          </h1>
          <form className="my-8 ">
            <section className="m-2 ">
              <div className="grid grid-cols-1 gap-1">
                <label className="font-medium" htmlFor="bankName">
                  Bank Name:{" "}
                </label>
                <label className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    id="bankName"
                    name="name"
                    onChange={handleChange}
                    className="grow  "
                    placeholder="Enter Bank Name"
                    value={formData.name}
                  />
                </label>
              </div>
            </section>
            {isError ? errorMessage : null}
            <div className="w-full flex items-center justify-center  mt-8">
              <button
                className="btn  bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
      {/* Bank List */}
      <section className=" max-w-5xl mx-auto mb-8">
        {isFetched
          ? data.map((bank, idx) => {
            return <div className=" flex items-center gap-2 m-6" key={idx}>
              <p className="p-1 px-3 mb-2 w-14 bg-teal-500 text-white">{idx + 1}</p>
              <p className=" bg-base-200 p-1 pl-4 mb-2 w-full">{bank.name}</p>
            </div>
          })
          : "No Bank Data"}
      </section >
    </div >
  );
};



export default AddBank;
