import { useParams } from "react-router-dom";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import { useQuery } from "@tanstack/react-query";
import {
  getSavingAccountDetailsById,
  savingsTransactionList,
  savingsWithdrawTransactionList,
} from "../../../api/admin";
import SavingAccountPerUserDetails from "./SavingAccountPerUserDetails";

import WithdrawsTable from "./WithdrawsTable";
import TransactionsTable from "./TransactionsTable";
import AddMoneySavings from "./AddMoneySavings";
import WithdrawMoneySavings from "./WithdrawMoneySavings";

const SavingsTransactionPostingDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [`saving-account-${id}`],
    queryFn: () => getSavingAccountDetailsById(id),
    initialData: [],
    enabled: !!id,
  });
  const { data: transactions } = useQuery({
    queryKey: [`saving-transactions-${id}`],
    queryFn: () => savingsTransactionList(id),
    initialData: null,
  });
  const { data: withdraws } = useQuery({
    queryKey: [`saving-withdraws-${id}`],
    queryFn: () => savingsWithdrawTransactionList(id),
    initialData: null,
  });
  console.log(withdraws);
  return (
    <>
      <section>
        <SavingAccountNav />
      </section>
      <section>
        {data.length ? <SavingAccountPerUserDetails data={data[0]} /> : null}
      </section>
      <section>
        <AddMoneySavings
          id={id}
          samityId={data.length ? data[0].samityId : null}
        />
        <WithdrawMoneySavings
          id={id}
          samityId={data.length ? data[0].samityId : null}
        />
      </section>
      <section>
        <div className="grid  md:grid-cols-2 ">
          <section>
            <div className="md:m-8">
              <h1 className="md:text-lg md:font-medium mt-3 text-center ">
                Transactions Table
              </h1>
              <div className="divider"></div>
              <table className="w-full  ">
                <tr className="grid grid-cols-4  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-4 items-center justify-center gap-1 text-center">
                  <th>SL</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
                {transactions
                  ? transactions.map((data, idx) => (
                      <TransactionsTable data={data} key={idx} index={idx} />
                    ))
                  : null}
              </table>
            </div>
          </section>

          <section>
            <div className="md:m-8">
              <h1 className="md:text-lg md:font-medium mt-4 text-center ">
                Withdraws Table
              </h1>
              <div className="divider"></div>
              <table className="w-full  ">
                <tr className="grid grid-cols-4  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-4 items-center justify-center gap-1 text-center">
                  <th>SL</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
                {withdraws
                  ? withdraws.map((data, idx) => (
                      <WithdrawsTable data={data} key={idx} index={idx} />
                    ))
                  : null}
              </table>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default SavingsTransactionPostingDetails;
