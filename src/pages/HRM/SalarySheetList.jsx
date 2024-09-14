import { Link } from "react-router-dom";


const SalarySheetList = ({ data }) => {
    console.log(data);
    const { _id, basicSalary, mobileBill, tourBill, overTime, specialAward, bonus, total, totalPaid, due, name, deduction } = data


    return (
        <div>

            <tr className="grid grid-cols-4 text-xs md:text-base bg-gray-100  border-b-4   md:grid-cols-4 items-center w-full justify-between text-center py-3">
                <td>{name}</td>
                <td>{basicSalary}</td>
                <td className="hidden md:block">{total}</td>


                <td>
                    <Link
                        to={`/salary_sheet_details/${_id}`}
                        state={{ data: data }}
                        className="btn btn-xs md:btn-sm btn-info text-white"
                    >
                        View
                    </Link>

                </td>
            </tr>
        </div>
    );
};

export default SalarySheetList;