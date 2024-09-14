// ExpenseLiabilitiesTable.jsx
import { dateToString } from "../../../utils/DateHelper";
import ExpenseButton from "./ExpenseButton";

export default function ExpenseLiabilitiesTable({ idx, data }) {
  const { date, head, amount, _id } = data;

  return (
    <tr key={_id}>
      <td className="px-4 py-2 border-b text-center">{idx + 1}</td>
      <td className="px-4 py-2 border-b text-center">{dateToString(date)}</td>
      <td className="px-4 py-2 border-b text-center">{head}</td>
      <td className="px-4 py-2 border-b text-center">{amount}</td>
      <td className="px-4 py-2 border-b text-center">
        <ExpenseButton data={data} />
      </td>
    </tr>
  );
}
