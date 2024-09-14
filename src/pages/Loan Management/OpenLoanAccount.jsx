import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { createLoanAccount, searchUserByPhoneNumber } from "../../../api/admin";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
import { IconSearch } from "../../../icons/icons";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import { useUserType } from "../../../hooks/userContext";
const initialState = {
  openingDate: "",
  expiryDate: "",
  paymentTerm: "Daily",
  profitPercentage: "",
  loanAmount: "",
  totalAmount: "",
  numberOfInstallment: 0,
  periodOfTimeInMonths: "",
  installmentAmount: 0,
  payFrom: null,
};

function calculateNumberOfInstallments(paymentTerm, loanPeriodInMonths) {
  switch (paymentTerm) {
    case "Daily":
      return loanPeriodInMonths * 30; // Assuming 30 days per month
    case "Weekly":
      return loanPeriodInMonths * 4; // Assuming 4 weeks per month
    case "Fortnightly":
      return loanPeriodInMonths * 2;
    case "Monthly":
      return loanPeriodInMonths;
    case "Quarterly":
      return Math.ceil(loanPeriodInMonths / 3); // Use Math.ceil for rounding up
    case "Half-Yearly":
      return Math.ceil(loanPeriodInMonths / 6);
    case "Yearly":
      return Math.ceil(loanPeriodInMonths / 12);
    default:
      throw new Error("Invalid payment term");
  }
}
function calculateEmi(totalAmount, paymentTerm, loanPeriodInMonths) {
  // Calculate number of installments (call the previous function)
  const numberOfInstallments = calculateNumberOfInstallments(
    paymentTerm,
    loanPeriodInMonths
  );
  let emi = totalAmount / numberOfInstallments;

  return [numberOfInstallments, emi.toFixed(2)]; // Round to two decimal places
}
{
  /** ! Component*/
}
const OpenLoanAccount = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createLoanAccount, {
      onSuccess: () => {
        {
          /**Rafi */
        }
        setFormData(initialState);
        swal("Loan Account Opened Successfully!");
      },
    });
  // * handleChange
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  useMemo(() => {
    const { loanAmount, profitPercentage } = formData;
    const profit = loanAmount * (profitPercentage / 100);
    const total = Number(loanAmount) + Number(profit);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.loanAmount, formData.profitPercentage]);

  useMemo(() => {
    const { totalAmount, paymentTerm, periodOfTimeInMonths } = formData;
    const [no_of_installment, emi] = calculateEmi(
      totalAmount,
      paymentTerm,
      periodOfTimeInMonths
    );
    const tempMatureDate = moment()
      .add(periodOfTimeInMonths, "months")
      .format("YYYY-MM-DD");
    setFormData((prev) => ({
      ...prev,
      numberOfInstallment: no_of_installment,
      installmentAmount: emi,
      expiryDate: tempMatureDate,
    }));
  }, [
    formData.totalAmount,
    formData.paymentTerm,
    formData.periodOfTimeInMonths,
    calculateEmi,
  ]);

  // * handleSearchUser
  const handleSearchUser = async (event) => {
    const { value } = event.target;
    if (value.length >= 11) {
      const userData = await searchUserByPhoneNumber(value);
      console.log(userData);
      if (userData.length) {
        console.log(userData[0]);
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
    const { branchId, samityId } = searchedUser;
    console.log(branchId, samityId);
    const status =
      localStorage.getItem("userType") === "admin" ? "approved" : "pending";
    const data = {
      memberId: searchedUser._id,
      branchId: branchId,
      samityId: samityId,
      status: status,
      ...formData,
      openedBy: user,
    };

    mutate(data);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, openingDate: new Date() }));
  }, []);
  return (
    <div>
      <section>
        <LoanManagementNav />
      </section>

      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Open Loan Account
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="member_id">
                  Search By Phone Number:{" "}
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
                <label className="font-medium" htmlFor="loan_amount">
                  Loan Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="loan_amount"
                  type="number"
                  placeholder=""
                  name="loanAmount"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="profit">
                  Profit:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="profit"
                  type="number"
                  name="profitPercentage"
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="profit_amount">
                  Total Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="profit_amount"
                  type="text"
                  placeholder="auto calculated"
                  value={formData.totalAmount}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="payment_term">
                  Payment Term:
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
                <label className="font-medium" htmlFor="period_of_time">
                  Period of time:
                </label>
                <input
                  name="periodOfTimeInMonths"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="period_of_time"
                  type="text"
                  placeholder="In months"
                  value={formData.periodOfTimeInMonths}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="no_of_installment">
                  Number of Installment:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="no_of_installment"
                  type="text"
                  placeholder=""
                  name="numberOfInstallment"
                  value={formData.numberOfInstallment}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="installment">
                  Installment:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="installment"
                  type="text"
                  placeholder="auto calculated"
                  value={formData.installmentAmount}
                  disabled
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
                <label className="font-medium" htmlFor="expiry_date">
                  Expiry Date:
                </label>
                <DatePicker
                  selected={formData.expiryDate}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  disabled
                  showIcon
                />
              </div>
              <DrawerBankCashSelector
                samityId={searchedUser ? searchedUser.samityId : null}
                callBackFn={setFormData}
                text={"Pay From"}
              />
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="gurantor_info">
                  Guarantor Info:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="guarantor_info"
                  type="text"
                  placeholder="select the nominee"
                  value={
                    searchedUser
                      ? searchedUser.nominee.name
                      : "No Data Available"
                  }
                  disabled
                />
              </div>
            </section>
            {isError ? errorMessage : null}
            <div className="w-full flex flex-col md:flex-row justify-center  mt-8">
              <button
                onClick={handleSubmit}
                className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
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

export default OpenLoanAccount;
