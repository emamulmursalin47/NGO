import { makeDepositFdr, makeWithdrawFdr } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import { dateToString } from "../../utils/DateHelper";
import WithdrawMoneyFdr from "./WithdrawMoneyFdr";

function FdrTransactionsTable({ data, index, additionalData }) {
  const { date, amount, description, _id, accountId, status } = data;

  const { mutate } = useMutationHook(makeWithdrawFdr, {
    key: [`fdr-account-${accountId}`],
  });
  function handleSubmit(e) {
    e.preventDefault();
    const transaction = {
      accountId,
      amount,
      transactionId: _id,
      date: new Date(),
      ...additionalData,
    };
    mutate(transaction);
  }
  return (
    <div className="max-w-5xl mx-auto">
      <section className="mx-1">
        <tr className="grid grid-cols-3 md:grid-cols-5 bg-gray-100 border-l-4 border-b-2 border-b-base-100 border-teal-700 items-center w-full justify-between text-center py-3">
          <td>{index + 1}</td>
          <td>{dateToString(date)}</td>
          <td>{amount}</td>
          <td>{status}</td>
          <td>
            {status === "unpaid" ? (
              <button onClick={handleSubmit}>Pay</button>
            ) : (
              <button disabled>Pay</button>
            )}
          </td>
        </tr>
      </section>
    </div>
  );
}

export default FdrTransactionsTable;
