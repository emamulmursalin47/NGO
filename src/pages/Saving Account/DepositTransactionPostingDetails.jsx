import { useParams } from "react-router-dom";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import { useQuery } from "@tanstack/react-query";
import {
  depositTransactionList,
  getDepositAccountDetailsById,
  withdrawTransactionList,
} from "../../../api/admin";
import SavingAccountPerUserDetails from "./SavingAccountPerUserDetails";
import WithdrawMoney from "./MakeWithDraw";
import AddMoney from "./AddMoney";
import WithdrawsTable from "./WithdrawsTable";
import TransactionsTable from "./TransactionsTable";

const DepositTransactionPostingDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [`saving-account-${id}`],
    queryFn: () => getDepositAccountDetailsById(id),
    initialData: [],
    enabled: !!id,
  });
  const { data: transactions } = useQuery({
    queryKey: [`transactions-${id}`],
    queryFn: () => depositTransactionList(id),
    initialData: null,
  });
  const { data: withdraws } = useQuery({
    queryKey: [`withdraws-${id}`],
    queryFn: () => withdrawTransactionList(id),
    initialData: null,
  });

  return (
    <>
      <section>
        <SavingAccountNav />
      </section>
      <section>
        {data.length ? <SavingAccountPerUserDetails data={data[0]} /> : null}
      </section>
      <section>
        <AddMoney id={id} />
        <WithdrawMoney id={id} />
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
                <tr className="grid grid-cols-3  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-3 items-center justify-center gap-1 text-center">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
                {transactions
                  ? transactions.map((data, idx) => (
                      <TransactionsTable data={data} key={idx} />
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
                <tr className="grid grid-cols-3  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-3 items-center justify-center gap-1 text-center">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
                {withdraws
                  ? withdraws.map((data, idx) => (
                      <WithdrawsTable data={data} key={idx} />
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

export default DepositTransactionPostingDetails;
