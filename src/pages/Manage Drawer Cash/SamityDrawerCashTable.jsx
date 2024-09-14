import { Link } from "react-router-dom";
import { dateToString } from "../../utils/DateHelper";

export default function SamityDrawerCashTable({ data, index }) {
  const { transactionDetails, amount, type } = data;
  const { by, date, sourceDetails } = transactionDetails;
  const { name, phone, type: userType } = by;

  return (
    <div className="max-w-5xl mx-auto">
      <section className="mx-1">
        <tr className="grid grid-cols-3 md:grid-cols-5 bg-gray-100 border-l-4 border-b-2 border-b-base-100 border-teal-700 items-center w-full justify-between text-center py-3">
          <td>{index + 1}</td>
          <td>{dateToString(date)}</td>
          <td>{amount.toFixed(2)}</td>
          <td>
            {sourceDetails} ({type})
          </td>
          <td>
            {userType == "admin" ? (
              <Link to="#">{name}</Link>
            ) : (
              <Link to={"#"}>{name}</Link>
            )}
          </td>
        </tr>
      </section>
    </div>
  );
}
