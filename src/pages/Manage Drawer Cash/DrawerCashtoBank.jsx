import { useEffect, useState } from "react";
import ManageDrawerCashNav from "./ManageDrawerCashNav/ManageDrawerCashNav";
import BankSelector from "../../component/bankSelector";
import BranchSamitySelector from "../../component/branchSamitySelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMutationHook from "../../../hooks/useMutationHook";
import { addDrawerToBank } from "../../../api/admin";
import { useUserType } from "../../../hooks/userContext";
const initialState = {
  branchId: "",
  samityId: "",
  bankId: "",
  amount: "",
  type: "dTob",
  date: new Date(),
};

const DrawerCashtoBank = () => {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType();
  const user = userDetails();
  const { mutate, isError, errorMessage, isPending } = useMutationHook(
    addDrawerToBank,
    {
      onSuccess: () => {
        swal("Completed!", "Press Ok To Continue", "success");
        setFormData(initialState);
      },
    }
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(date),
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = {
      ...formData,
      by: user,
    };
    mutate(newFormData);
  };

  return (
    <div>
      <section>
        <ManageDrawerCashNav />
      </section>
      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Drawer Cash to Bank
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <BranchSamitySelector callBackFn={setFormData} />
              <BankSelector callBackFn={setFormData} />
              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="date">
                  Date(DD/MM/YYYY):
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleChangeDate}
                  className=" hover:border-teal-500 rounded  w-full  input input-bordered input-sm"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="type">
                  Type:
                </label>
                <select
                  id="type"
                  name="type"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                  value={formData.type}
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="dTob">From Drawer To Bank</option>
                  <option value="bTod">From Bank To Drawer</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="cash_in_amount">
                  Cash in Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="cash_in_amount"
                  name="amount"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter your amount"
                  value={formData.amount}
                />
              </div>
            </section>
            {isError ? errorMessage : null}

            <div className="w-full flex justify-center  mt-12">
              <button
                className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default DrawerCashtoBank;
