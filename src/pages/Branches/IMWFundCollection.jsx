import { useState } from "react";
import BranchesNav from "./BranchesNav/BranchesNav";
import { IconSearch } from "../../../icons/icons";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { searchUserByPhoneNumber } from "../../../api/admin";
const initialState = {
  description: "",
  date: "",
  amount: 0,
  memberId: "",
};

const IMWFundCollection = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  // * handleSearchUser
  const handleSearchUser = async (event) => {
    const { value } = event.target;
    if (value.length >= 11) {
      const userData = await searchUserByPhoneNumber(value);
      if (userData.length) {
        setShowLoadingIcon(false);
        const { memberId } = userData[0];
        setFormData((prev) => ({ ...prev, memberId }));
        console.log(userData[0]);
        setSearchedUser(userData[0]);
      } else {
        toast.error("No Data Found");
        setShowLoadingIcon(false);
      }
    } else {
      setShowLoadingIcon(true);
    }
  };
  return (
    <div>
      <section>
        <BranchesNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          IMW Fund Collection
        </h1>

        <h3 className="text-lg font-bold text-start max-w-5xl mx-auto  pt-8 pb-2 ">
          Insurance
        </h3>

        <form className="my-8" action="">
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="acc_id">
                Account Id:{" "}
              </label>
              <label className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="acc_id"
                  className="grow  "
                  placeholder="Search"
                  onChange={handleSearchUser}
                />
                {!showLoadingIcon ? (
                  <IconSearch className="w-6 h-6 opacity-50" />
                ) : (
                  <MoonLoader size={15} />
                )}
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="date">
                Date:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="date"
                type="date"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="insurance_amount">
                Insurance Amount:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500"
                id="insurance_amount"
                type="number"
                placeholder="Enter your amount"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="installment_amount">
                Installment Amount:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500"
                id="installment_amount"
                type="number"
                placeholder="Enter how many times you paid"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="remarks">
                Remarks:
              </label>
              <textarea
                className="input input-bordered hover:border-teal-500 "
                id="remarks"
                cols="10"
                rows="1"
              ></textarea>
            </div>
          </section>
        </form>

        <h3 className="text-lg font-bold text-start max-w-5xl mx-auto  pt-4 pb-2 ">
          Member Welfare Fund
        </h3>

        <form className="my-8" action="">
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="fund_amount">
                Fund Amount:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500"
                id="fund_amount"
                type="number"
                placeholder="Enter your amount"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="date">
                Date:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="date"
                type="date"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="installment_amount">
                Installment Amount:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500"
                id="installment_amount"
                type="number"
                placeholder="Enter how many times you paid"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="insurance_remarks">
                Insurance Remarks:
              </label>
              <textarea
                className="input input-bordered hover:border-teal-500 "
                id="insurance_remarks"
                cols="10"
                rows="1"
              ></textarea>
            </div>
          </section>
        </form>

        <div className="w-full flex justify-center  mt-12">
          <input
            className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
            type="submit"
          />
        </div>
      </section>
    </div>
  );
};

export default IMWFundCollection;
