import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { searchLoanAccount } from "../../../api/admin";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
import UserDetailsCard from "../../component/UserDetailsCard";
import LoanAccountsCard from "../../component/LoanAccountsCard";

const Loan_transaction_posting = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loanAccounts, setLoanAccounts] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const { mutate } = useMutationHook(searchLoanAccount, {
    onSuccess: (data) => {
      const { userDetails, loanAccounts } = data[0];
      setLoanAccounts(loanAccounts);
      setUserDetails(userDetails);
    },
    onError: () => {
      toast.error("No Data Found");
    },
  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUserPhoneNumber(value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    mutate(userPhoneNumber);
  }
  return (
    <div>
      <section>
        <LoanManagementNav />
      </section>

      <section className="p-2 m-4 max-w-5xl mx-auto">
        <section className="">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Transaction Posting
          </h1>
          <div className=" flex flex-col md:flex-row gap-4 w-full p-4">
            <input
              type="number"
              name="phoneNumber"
              placeholder="Search by PhoneNumber"
              className="input input-bordered input-sm w-full   hover:border-teal-500  "
              onChange={handleChange}
            />
            <button
              className="btn btn-sm  hover:bg-teal-500 hover:text-white"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </section>
        <section>
          {userDetails ? (
            <UserDetailsCard data={{ ...userDetails, userPhoneNumber }} />
          ) : null}
        </section>
        <section>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="grid grid-cols-4 w-full bg-teal-500 text-white rounded-md">
                <th>Name</th>
                <th>Payment</th>
                <th>date</th>
                <th>Action</th>
              </thead>
            </table>
          </div>

          {loanAccounts
            ? loanAccounts.map((data, idx) => (
                <LoanAccountsCard value={userDetails} key={idx} data={data} />
              ))
            : null}
        </section>
      </section>
    </div>
  );
};

export default Loan_transaction_posting;
