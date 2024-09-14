import { useEffect, useMemo, useState } from "react";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import "react-datepicker/dist/react-datepicker.css";
import { IconSearch } from "../../../icons/icons";
import {
  createSavingsAccount,
  searchUserByPhoneNumber,
} from "../../../api/admin";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
import { useUserType } from "../../../hooks/userContext";
const initialState = {
  openingDate: "",
  paymentTerm: "Daily",
  profitPercentage: "",
};

const SavingAccounts = () => {
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createSavingsAccount, {
      onSuccess: () => {
        setFormData(initialState);
        swal("Savings Account Opened Successfully!");
      },
    });
  // * handleChange

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // * handleSearchUser
  const handleSearchUser = async (event) => {
    const { value } = event.target;
    if (value.length >= 11) {
      const userData = await searchUserByPhoneNumber(value);
      console.log(userData);
      if (userData.length) {
        setShowLoadingIcon(false);
        setSearchedUser(userData[0]);
      } else {
        toast.error("No Data Found");
        setShowLoadingIcon(false);
      }
    } else {
      setShowLoadingIcon(true);
    }
  };
  //* !handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchedUser.status === "pending") {
      return toast.error("Please contact Admin for member request approval");
    }
    let userType = localStorage.getItem("userType");
    let status = userType === "admin" ? "approved" : "pending";
    const data = {
      branchId: searchedUser.branchId,
      samityId: searchedUser.samityId,
      memberId: searchedUser._id,
      status: status,
      openedBy: user,
      ...formData,
    };
    mutate(data);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, openingDate: new Date() }));
  }, []);
  return (
    <div>
      <section>
        <SavingAccountNav />
      </section>

      <section>
        {/* input container */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Open Savings Account{" "}
          </h1>
          <h1>
            {searchedUser?.status === "pending" ? (
              <h1 className="w-full">
                {"Please Contact Admin for member request approval."}
              </h1>
            ) : null}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-col-3 w-full md:max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="member_id">
                  Search Number:{" "}
                </label>
                <label className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2">
                  <input
                    onChange={handleSearchUser}
                    type="number"
                    id="member_id"
                    className="grow  "
                    placeholder="Search"
                  />
                  {!showLoadingIcon ? (
                    <IconSearch className="w-6 h-6 opacity-50" />
                  ) : (
                    <MoonLoader size={15} />
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="acc_id">
                  User Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="acc_id"
                  type="text"
                  value={searchedUser ? searchedUser.name : "No Data Available"}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="occupation">
                  Status:
                </label>
                <select
                  onChange={handleChange}
                  name="paymentTerm"
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled>Select a Value</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="profit">
                  Profit (%):
                </label>
                <input
                  name="profitPercentage"
                  onChange={handleChange}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="profit"
                  type="number"
                  placeholder="10%"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-3"></div>
            </section>
            {isError ? errorMessage : null}

            <div className="md:w-full flex justify-center  mt-24">
              <button
                className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
                onClick={handleSubmit}
              >
                Submit{" "}
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default SavingAccounts;
