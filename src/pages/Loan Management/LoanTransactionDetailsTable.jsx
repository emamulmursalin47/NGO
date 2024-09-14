import { dateToString } from "../../utils/DateHelper";

export const LoanTransactionDetailsTable = ({ data }) => {
  const {
    _id,
    loanId,
    amount,
    addFineAmount,
    fineReason,
    payFineAmount,
    createdAt,
    updatedAt,
  } = data;

  return (
    <div className=" w-full">
      <tr className="px-2 grid grid-cols-2 text-xs md:text-base bg-gray-100  border-b-4   md:grid-cols-5 items-center w-full justify-between text-center py-3">
        <td>{loanId}</td>
        <td>{amount}</td>
        <td className="hidden md:block">{addFineAmount}</td>
        <td className="hidden md:block">{fineReason}</td>
        <td className="hidden md:block">{dateToString(createdAt)}</td>
      </tr>
    </div>
  );
};
