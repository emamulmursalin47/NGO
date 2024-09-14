import { Link } from "react-router-dom";
import { dateToString } from "../../../utils/DateHelper";
import AssetButton from "./AssetButton";

export default function AssetLiabilitiesTable({ idx, data }) {
  const { date, head, total } = data;

  return (
    <tr className="bg-gray-100 border-b">
      <td className="px-4 py-2 border-b text-center">{idx + 1}</td>
      <td className="px-4 py-2 border-b text-center">{head}</td>
      <td className="px-4 py-2 border-b text-center">{total}</td>
      <td className="px-4 py-2 border-b text-center">{dateToString(date)}</td>
      <td className="px-4 py-2 border-b text-center">
        <AssetButton data={data} />
      </td>
    </tr>
  );
}
