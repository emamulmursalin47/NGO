import { useEffect, useMemo, useState } from "react";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import { useQuery } from "@tanstack/react-query";
import { getDepositAccountListsOfUser } from "../../../api/admin";
import UserDetailsCard from "../../component/UserDetailsCard";
import {
  DpsAccountCard,
  FdsAccountCard,
  SavingsAccountCard,
} from "../../component/DepositAccountCard";
import { useSearchParams } from "react-router-dom";
const TransactionnPosting = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setUserPhoneNumber(Number(value));
    if (value.length === 11) {
      console.log("hii");
      setSearchParams({ number: value });
    }
  };
  const { data } = useQuery({
    queryKey: ["user-deposit-account-list"],
    queryFn: () => getDepositAccountListsOfUser(userPhoneNumber),
    initialData: null,
    enabled: userPhoneNumber?.length === 11 ? true : false,
  });

  useEffect(() => {
    if (searchParams.get("number")) {
      setUserPhoneNumber(searchParams.get("number"));
    }
  }, [searchParams]);

  return (
    <div>
      <section>
        <SavingAccountNav />
      </section>

      <section className="max-w-6xl mx-auto p-4">
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2  ">
            Deposit Transaction Posting
          </h1>
          <div className=" flex flex-col md:flex-row gap-4 w-full py-4 font-medium">
            <input
              type="number"
              name="phoneNumber"
              placeholder="Search by PhoneNumber"
              className="input input-bordered input-sm w-full   hover:border-teal-500  "
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          {data && userPhoneNumber?.length == 11 ? (
            <UserDetailsCard data={{ ...data.userDetails, userPhoneNumber }} />
          ) : null}
        </section>

        {/* Saving Accounts */}
        <section>
          {data && (
            <div>
              <h1 className="text-xl font-bold text-start max-w-6xl mx-auto  pt-4 border-b-4 pb-2 my-4 ">
                Saving Accounts
              </h1>
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
              <div>
                {data && userPhoneNumber?.length == 11 && data?.savingsAccounts
                  ? data.savingsAccounts.map((account, idx) => (
                      <SavingsAccountCard
                        value={data.userDetails}
                        key={idx}
                        data={account}
                      />
                    ))
                  : null}
              </div>
            </div>
          )}
        </section>
        {/* FDs Accounts */}
        <section>
          {data && (
            <div>
              <h1 className="text-xl font-bold text-start max-w-6xl mx-auto  pt-4 border-b-4 pb-2 my-4 ">
                FDR Accounts
              </h1>
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
            </div>
          )}
          {data && userPhoneNumber?.length == 11 && data?.fdrAccounts
            ? data.fdrAccounts.map((account, idx) => (
                <FdsAccountCard
                  value={data.userDetails}
                  key={idx}
                  data={account}
                />
              ))
            : null}
        </section>
        {/* Dps Accounts */}
        <section>
          {data && (
            <div>
              <h1 className="text-xl font-bold text-start max-w-6xl mx-auto  pt-4 border-b-4 pb-2 my-4 ">
                DPS Accounts
              </h1>
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
            </div>
          )}
          {data && userPhoneNumber?.length == 11 && data?.dpsAccounts
            ? data.dpsAccounts.map((account, idx) => (
                <DpsAccountCard
                  value={data.userDetails}
                  key={idx}
                  data={account}
                />
              ))
            : null}
        </section>
      </section>
    </div>
  );
};

export default TransactionnPosting;
