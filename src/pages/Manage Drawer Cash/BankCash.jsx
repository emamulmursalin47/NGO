import { useEffect, useState } from "react";
import ManageDrawerCashNav from "./ManageDrawerCashNav/ManageDrawerCashNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addDrawerCashInOut,
  addMoneyToBank,
  bankCashDetails,
  drawerCashDetails,
} from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { useUserType } from "../../../hooks/userContext";
import BankSelector from "../../component/bankSelector";
import { Link } from "react-router-dom";
const initialState = {
  amount: 0,
  bankId: "",
  isCapital: true,
  transactionDetails: {
    date: new Date(),
    sourceDetails: "bank cash",
    by: { name: "", phone: "", type: "" },
  },
  type: "cashIn",
};

const DrawerCash = () => {
  const [formData, setFormData] = useState(initialState); // Initialize form data with initial state

  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails(); // Get the user object

  const { data: cashDetails } = useQuery({
    queryKey: ["bank-cash-details"], // Query key for bank cash details
    queryFn: bankCashDetails, // Function to fetch bank cash details
    initialData: [], // Initial data for bank cash
  });

  console.log(cashDetails); // Log the fetched bank cash details

  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(
      addMoneyToBank, // Function to add money to bank
      {
        key: ["bank-cash-details"], // Query key for drawer cash
        onSuccess: () => {
          swal("Completed", "Press Ok To Continue", "success"); // Show success message
          setFormData(initialState); // Reset form data
        },
        onError: () => {
          toast.error("Error!"); // Show error message
        },
      }
    );

  const handleChange = (event) => {
    const { name, value, type } = event.target; // Get the name, value, and type of the input

    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value, // Update the form data based on the input type
      };
    });
  };

  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      transactionDetails: {
        ...prev.transactionDetails,
        date: new Date(date), // Update the date in transaction details
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      ...formData,
      transactionDetails: {
        ...formData.transactionDetails,
        by: user, // Add the user object to transaction details
      },
    };

    mutate(newData); // Submit the form data
  };

  const { data, isFetched } = useQuery({
    queryKey: ["bank-cash"], // Query key for drawer cash
    queryFn: drawerCashDetails, // Function to fetch drawer cash details
    initialData: [], // Initial data for drawer cash
  });
  console.log(data);
  return (
    <div>
      <section>
        <ManageDrawerCashNav />
      </section>
      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Bank Cash
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <BankSelector callBackFn={setFormData} />

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

      {/* Bank Details Card */}

      <div className="md:m-2 xl:m-0">
        <table className="w-full">
          <tr className="grid grid-cols-4   text-xs md:text-base bg-teal-700  py-2 text-white md:grid-cols-9 items-center justify-center gap-1 text-center">
            <th>SL</th>
            <th className="col-span-2 hidden md:block">Bank Name</th>
            <th className="col-span-2">Balance</th>
            <th className="col-span-2 hidden md:block">ID</th>
            <th className=" col-span-2">Action</th>
          </tr>
        </table>
      </div>

      {isFetched ? (
        cashDetails.map((data, idx) => (
          <BankDetailsCard data={data} id={idx} key={idx} />
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};
function BankDetailsCard({ data, id }) {
  const { _id, balance, name } = data;
  console.log(id);

  return (
    <div className="bg-white shadow-md rounded-lg p-0">
      <tr className="grid grid-cols-5 text-xs md:text-base bg-gray-100 border-b-2 md:grid-cols-9 items-center w-full justify-between text-center py-3">
        <td className="font-bold ">{id + 1}</td>
        <td className="col-span-2">{name}</td>
        <td className="col-span-2">{balance}</td>
        <td className="col-span-2">{_id}</td>
        <td className="col-span-2">
          <Link
            to={`/bank_cash/${_id}`}
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
