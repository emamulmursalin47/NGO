import { Link } from "react-router-dom";
import { dateToString } from "../utils/DateHelper";



export default function Purchase({ data }) {
  const {
    totalPayment, date, status,
    expenseName, _id
  } = data

  return <div>
    <section className="max-w-5xl mx-auto">
      <tr className="grid grid-cols-5 md:grid-cols-5 text-xs md:text-base bg-gray-100 border-b-2  items-center w-full justify-between text-center py-3">
        <td>{expenseName}</td>
        <td>{dateToString(date)}</td>
        <td>{totalPayment}</td>
        <td>{status}</td>
        <td>
          <Link to={`/some/${_id}`}>
            <button className="btn btn-info btn-xs md:btn text-white">view</button>
          </Link>
        </td>
      </tr>
    </section>
  </div>;
}
