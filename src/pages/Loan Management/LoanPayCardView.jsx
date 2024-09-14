import { Link } from "react-router-dom";
import { dateToString } from "../../utils/DateHelper";

const LoanPayCardView = ({ data }) => {
  const {
    _id,
    nameOfInstitute,
    updatedAt,
    createdAt,
    totalPaid,
    totalAmount,
    durationInMonth,
    interestRate,
    amount,
    perInstallment,
  } = data;

  console.log(_id);
  return (
    <div>
      <div className="card min-h-96  bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-base w-fit text-wrap">
            Name Of Institute
          </h2>
          <h3>
            <span>{nameOfInstitute}</span>
          </h3>
          <div className="divider"></div>
          <div className="grid grid-cols-1 md:grid-cols-2  ">
            <p>
              Period Month:
              <span className="font-bold text-emerald-500">

                {durationInMonth}
              </span>
            </p>
            <p>
              Interest Rate:
              <span className="font-bold text-emerald-500">

                {interestRate}
              </span>
            </p>
          </div>

          <div className="flex flex-col flex-wrap md:flex-row ">
            <p className="pb-3">
              Total Amount:
              <span className="font-bold text-emerald-500"> {totalAmount.toFixed(2)}</span>
            </p>
            <p>
              Total Paid:
              <span className="font-bold text-emerald-500"> {totalPaid.toFixed(2)}</span>
            </p>
          </div>
          <p className="md:col-span-2 mt-1">
            Per Installment:
            <span className="font-bold text-emerald-500">

              {perInstallment.toFixed(2)}
            </span>
          </p>

          <div className="card-actions justify-end">
            <p>
              Created At: 
              <span className="text-emerald-500">
                {dateToString(createdAt)}
              </span>
            </p>
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/loan_pay_details/${_id}`}
              state={data}
              className="btn btn-sm w-full   bg-emerald-500 text-white "
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPayCardView;

