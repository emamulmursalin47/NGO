import { useEffect, useState } from "react";
import ManageDrawerCashNav from "./ManageDrawerCashNav/ManageDrawerCashNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDrawerCashInOut, drawerCashDetails } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { useUserType } from "../../../hooks/userContext";
import { Link } from "react-router-dom";
const initialState = {
  amount: 0,
  branchId: "",
  samityId: "",
  transactionDetails: {
    date: new Date(),
    sourceDetails: "drawer cash",
    by: { name: "", phone: "", type: "" },
  },
  type: "cashIn",
  isCapital: true,
};

const DrawerCash = () => {
  const [formData, setFormData] = useState(initialState); // Initialize form data state with initial values
  const { userDetails } = useUserType(); // Custom hook to get user details based on user type
  const user = userDetails(); // Get the current user details
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(addDrawerCashInOut, {
      // Custom hook for handling mutations
      key: ["drawer-cash"], // Query key for cache invalidation and refetching
      onSuccess: () => {
        // Callback on successful mutation
        swal("Completed", "Press Ok To Continue", "success"); // Show success alert
        setFormData(initialState); // Reset form data to initial state
      },
      onError: () => {
        // Callback on mutation error
        toast.error("Error!"); // Show error toast notification
      },
    });

  const handleChange = (event) => {
    // Handler for input changes
    const { name, value } = event.target; // Get input name and value
    console.log(name, value); // Log input changes for debugging
    setFormData((prev) => {
      // Update form data state
      return { ...prev, [name]: value }; // Spread previous state and update the changed field
    });
  };

  const handleChangeDate = (date) => {
    // Handler for date changes
    setFormData((prev) => ({
      ...prev,
      transactionDetails: {
        ...prev.transactionDetails,
        date: new Date(date), // Update date in transaction details
      },
    }));
  };

  const handleSubmit = (event) => {
    // Handler for form submission
    event.preventDefault(); // Prevent default form submission
    const newData = {
      ...formData,
      transactionDetails: {
        ...formData.transactionDetails,
        by: user, // Add user details to transaction details
      },
    };
    mutate(newData); // Execute mutation with updated form data
  };

  const { data } = useQuery({
    queryKey: ["drawer-cash"], // Query key for caching and refetching
    queryFn: drawerCashDetails, // Function to fetch drawer cash details
    initialData: [], // Initial data for the query
  });

  return (
    <div>
      <section>
        <ManageDrawerCashNav />
      </section>
      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Drawer Cash
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <BranchSamitySelector callBackFn={setFormData} />

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="type">
                  Type:
                </label>
                <select
                  id="type"
                  name="type"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="cashIn">Cash In</option>
                  <option value="cashOut">Cash Out</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="date">
                  Date(DD/MM/YYYY):
                </label>
                <DatePicker
                  selected={formData.transactionDetails.date}
                  onChange={handleChangeDate}
                  className=" hover:border-teal-500 rounded  w-full  input input-bordered input-sm"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="cash_out_amount">
                  Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="cash_out_amount"
                  name="amount"
                  onChange={handleChange}
                  type="number"
                  value={formData.amount}
                  placeholder="Enter your amount"
                />
              </div>
            </section>
            <div className=" text-center font-medium m-4 w-fit mx-auto bg-red-500 text-white p-1 rounded-md">
              {isError ? errorMessage : null}
            </div>
            <div className="w-full flex justify-center  mt-12 mb-28">
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
      </section>
      {/* Details Section */}

      <div className="md:m-2 xl:m-0">
        <table className="w-full">
          <tr className="grid grid-cols-4   text-xs md:text-base bg-teal-700  py-2 text-white md:grid-cols-9 items-center justify-center gap-1 text-center">
            <th>SL</th>
            <th className="col-span-2 hidden md:block">Branch Name</th>
            <th className="col-span-2">Samity Name</th>
            <th className="col-span-2 hidden md:block">Drawer Cash</th>
            <th className=" col-span-2">Action</th>
          </tr>
        </table>
      </div>

      <section>
        {data.length ? (
          data.map((data, idx) => (
            <DrawerCashCard data={data} idx={idx} key={idx} />
          ))
        ) : (
          <div>No data</div>
        )}
      </section>
    </div>
  );
};
function DrawerCashCard({ data, idx }) {
  const { _id, branchName, samityName, drawerCash } = data;

  return (
    <div className="bg-white shadow-md rounded-lg p-0">
      <tr className="grid grid-cols-5 text-xs md:text-base bg-gray-100 border-b-2 md:grid-cols-9 items-center w-full justify-between text-center py-3">
        <td>{idx + 1}</td>
        <td className="col-span-2">{branchName}</td>
        <td className="col-span-2">{samityName}</td>
        <td className="col-span-2">{drawerCash}</td>
        <td className="col-span-2">
          <Link
            to={`/drawer_cash/${_id}`}
            className="btn btn-xs md:btn-sm btn-info text-white"
          >
            View
          </Link>
        </td>
      </tr>
    </div>
  );
}

export default DrawerCash;
