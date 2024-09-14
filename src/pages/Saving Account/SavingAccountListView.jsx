import { Link } from "react-router-dom";
import { dateToString } from "../../utils/DateHelper";

const SavingAccountListView = ({ data, idx }) => {
  const { _id, paymentTerm, totalDeposit, openingDate, balance } = data;
  return (
    <div>
      <section className="max-w-5xl mx-auto">
        <tr className="grid grid-cols-4 md:grid-cols-5 text-xs md:text-base bg-gray-100 border-l-4 border-teal-700 items-center w-full justify-between text-center py-3">
          <td>
            <Link to={`/members_details/${data.memberDetails.mobileNumber}`}>
              {data.memberDetails.name}
            </Link>
          </td>
          <td>{dateToString(openingDate)}</td>
          <td className="hidden md:block">{totalDeposit}</td>
          <td className="">{balance}</td>

          <td>
            <Link
              state={{ data: data }}
              to={`/savings_transaction_posting_details/${_id}`}
            >
              <button className="btn btn-xs md:btn-sm  btn-info text-white">
                view
              </button>
            </Link>
          </td>
        </tr>
      </section>
    </div>
  );
};

export default SavingAccountListView;
