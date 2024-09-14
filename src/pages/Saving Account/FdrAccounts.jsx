import { useEffect, useMemo, useState } from "react";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { IconSearch } from "../../../icons/icons";
//Payment Term ==== Profit Withdraw Term
import { createFdrAccount, searchUserByPhoneNumber } from "../../../api/admin";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import { useUserType } from "../../../hooks/userContext";
const initialState = {
  periodOfTimeInMonths: "",
  openingDate: "",
  matureDate: "",
  paymentTerm: "At a Time",
  amount: 0,
  profitPercentage: 0,
  onMatureAmount: 0,
  totalProfit: 0,
  profitPerInstallment: 0,
  type: "flat",
  totalInstallment: 0,
  payFrom: null,
};
const getDepositDates = (
  periodInMonths,
  paymentTerm,
  amount,
  profitPercentage,
  type
) => {
  let installmentCount = 0;
  switch (paymentTerm) {
    case "At a Time":
      installmentCount = 1;
      break;
    case "Monthly":
      installmentCount = periodInMonths;
      break;
    case "Quarterly":
      installmentCount = Math.trunc(periodInMonths / 4);
      break;
    case "Half-Yearly":
      installmentCount = Math.trunc(periodInMonths / 6);
      break;
    case "Yearly":
      installmentCount = Math.trunc(periodInMonths / 12);
      break;
    default:
      break;
  }
  let profit = 0;
  if (type === "flat") {
    profit = ((amount * (profitPercentage / 100)) / 12) * periodInMonths;
  } else {
    profit =
      ((amount * (profitPercentage / 100)) / 365) * (periodInMonths * 30);
  }
  return [installmentCount, Math.ceil(profit)];
};

const Deposit = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createFdrAccount, {
      onSuccess: () => {
        setFormData(initialState);
        swal("FDR Account Opened Successfully!");
      },
    });
  // * handleChange
  const periodOfTimeInMonths = useMemo(() => {
    const tempMatureDate = moment()
      .add(formData.periodOfTimeInMonths, "months")
      .format("YYYY-MM-DD");
    setFormData((prev) => ({ ...prev, matureDate: tempMatureDate }));
  }, [formData.periodOfTimeInMonths]);
  const profitPercentage = useMemo(() => {
    const [installmentCount, profit] = getDepositDates(
      formData.periodOfTimeInMonths,
      formData.paymentTerm,
      formData.amount,
      formData.profitPercentage,
      formData.type
    );
    let mA = formData.amount + profit;
    let profitPerInstalment = profit / installmentCount;

    setFormData((prev) => ({
      ...prev,
      onMatureAmount: mA,
      totalProfit: profit,
      totalInstallment: installmentCount,
      profitPerInstallment: isNaN(profitPerInstalment)
        ? 0
        : Number(profitPerInstalment.toFixed(2)),
    }));
  }, [
    formData.periodOfTimeInMonths,
    formData.amount,
    formData.paymentTerm,
    formData.profitPercentage,
    formData.type,
  ]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
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
    console.log(data);
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
            Open FDR Account{" "}
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
                <label className="font-medium " htmlFor="payment_schedule">
                  Payment Schedule:
                </label>
                <select
                  onChange={handleChange}
                  name="paymentTerm"
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option>--Select--</option>
                  <option value="At a Time">At a Time</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="occupation">
                  Type:
                </label>
                <select
                  onChange={handleChange}
                  name="type"
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled>Select a Value</option>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
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
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="period_of_time">
                  Period of Time (In Month):
                </label>
                <input
                  name="periodOfTimeInMonths"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="period_of_time"
                  type="number"
                  placeholder="In months"
                  value={formData.periodOfTimeInMonths}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="per_installment">
                  Total Amount:
                </label>
                <input
                  onChange={handleChange}
                  name="amount"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="per_installment"
                  type="number"
                  placeholder="Type money amount here"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="per_installment">
                  Profit Per Installment:
                </label>
                <input
                  name="profitPerInstallment"
                  value={formData.profitPerInstallment}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="per_installment"
                  disabled
                  placeholder={formData.profitPerInstallment}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="per_installment1">
                  Total Profit:
                </label>
                <input
                  name="totalProfit"
                  value={formData.totalProfit}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="per_installment1"
                  disabled
                  placeholder={formData.totalProfit}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="on_mature_amount">
                  {" "}
                  On Mature Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="on_mature_amount"
                  type="number"
                  disabled
                  value={formData.onMatureAmount}
                  placeholder="500 tk"
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="opening_date">
                  {" "}
                  Opening Date:
                </label>

                <DatePicker
                  selected={formData.openingDate}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  disabled
                  showIcon
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mature_date">
                  Mature Date:
                </label>
                <DatePicker
                  selected={formData.matureDate}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  disabled
                  showIcon
                />
              </div>
              <DrawerBankCashSelector
                samityId={searchedUser ? searchedUser.samityId : null}
                text={"Add Money To"}
                callBackFn={setFormData}
              />
              <div className="flex flex-col gap-1 md:col-span-3"></div>
            </section>
            {isError ? errorMessage : null}

            <div className="md:w-full flex justify-center  mt-10">
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

export default Deposit;
