import toast from "react-hot-toast";
import { ngoLoanPayment } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import { dateToString } from "../../utils/DateHelper";

const LoanPayDetailsList = ({ data, index, bankCash, drawerCash, user }) => {
  const { amount, date, ngoLoanId, remark, _id, status } = data;
  const { mutate } = useMutationHook(ngoLoanPayment, {
    key: [`nog-loan-${ngoLoanId}`],
    onSuccess: () => {
      toast.success("Done!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    let payFrom = null;
    if (bankCash) {
      payFrom = {
        type: "bank",
        _id: bankCash.bankId,
      };
    } else {
      payFrom = {
        type: "drawer",
        _id: drawerCash.samityId,
      };
    }

    const body = {
      ngoLoanId: ngoLoanId,
      transactionId: _id,
      amount: Number(amount.toFixed(2)),
      status: "paid",
      payFrom: payFrom,
      by: user,
      date: new Date(),
    };
    mutate(body);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <section className="mx-1">
        <tr className="grid grid-cols-3 md:grid-cols-5 bg-gray-100 border-l-4 border-b-2 border-b-base-100 border-teal-700 items-center w-full justify-between text-center py-3">
          <td>{index + 1}</td>
          <td>{dateToString(date)}</td>
          <td>{amount.toFixed(2)}</td>
          <td>{status}</td>
          <td>
            {status === "unpaid" ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-3 py-2"
              >
                Pay{" "}
              </button>
            ) : (
              <button className="bg-green-600 text-white px-3 py-2" disabled>
                Pay
              </button>
            )}
          </td>
        </tr>
      </section>
    </div>
  );
};

export default LoanPayDetailsList;
