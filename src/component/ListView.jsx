import { Link } from "react-router-dom";
import { dateToString } from "../utils/DateHelper";

const ListView = ({ data, idx }) => {
    console.log(data);
    const { name, status, mobileNumber, openingDate } = data;
    console.log(idx);
    return (
        <>
            <tr className="grid grid-cols-5 text-xs md:text-base bg-gray-100 border-b-2   md:grid-cols-9 items-center w-full justify-between text-center py-3">
                <td className="font-bold ">{idx + 1}</td>
                <td className="col-span-2 hidden md:block">{dateToString(openingDate)}</td>
                <td className="col-span-2">{name}</td>
                <td className="col-span-2 hidden md:block">{mobileNumber}</td>

                <td className="col-span-2">
                    <Link
                        to={`/members_details/${mobileNumber}`}
                        className="btn btn-xs md:btn-sm btn-info text-white"
                    >
                        View
                    </Link>
                </td>
            </tr>
        </>
    );
};

export default ListView;
