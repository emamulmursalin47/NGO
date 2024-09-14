import { dateToString } from "../../utils/DateHelper";
export const LoanDetailsCard = ({ data }) => {
  const {
    _id,
    memberId,
    paymentTerm,
    loanAmount,
    profitPercentage,
    totalAmount,
    numberOfInstallment,
    installmentAmount,
    openingDate,
    expiryDate,
    paid,
    loanFine,
    loanFinePaid,
  } = data;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="border-b-4  text-gray-600 text-lg pl-6 font-medium  pb-2 pt-1 flex items-center gap-2">
        <span>
          <img
            className="w-8"
            src="/Admin Dashboard icon/Total members.png"
            alt=""
          />
        </span>{" "}
        User Details
      </h1>
      <div className=" border-b-4 text-base font-medium tracking-wide divide-y-1 space-y-3 grid grid-cols-1 md:grid-cols-2 leading-6 p-6 py-3 bg-teal-50 rounded-md ">
        <p className="flex items-center gap-2">
          <span>
            <img className="w-4" src="/NGO Dashboard icon/Member.png" alt="" />
          </span>{" "}
          Member Name : <span className="font-normal pl-2">Mr. Yo </span>
        </p>

        <p className="flex items-center gap-2">
          {" "}
          <img className="w-5" src="/NGO Dashboard icon/report.png" alt="" />
          Payment Term:{" "}
          <span className="font-normal text-white rounded px-2 bg-teal-500">
            {paymentTerm}
          </span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img className="w-5" src="/NGO Dashboard icon/payroll.png" alt="" />
          Loan Amount: <span className="font-normal pl-2">{loanAmount} </span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/bank-building.png"
            alt=""
          />
          Profit Percentage:{" "}
          <span className="font-normal pl-2">{profitPercentage} %</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Total Amount : <span className="font-normal pl-2">{totalAmount}</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Number of Installment :{" "}
          <span className="font-normal pl-2">{numberOfInstallment}</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Installment Amount:{" "}
          <span className="font-normal pl-2">{installmentAmount}</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Paid: <span className="font-normal pl-2">{paid}</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Loan Fine: <span className="font-normal pl-2">{loanFine}</span>
        </p>
        <p className="flex items-center gap-2">
          {" "}
          <img
            className="w-5"
            src="/NGO Dashboard icon/manage-drawer-cash.png"
            alt=""
          />
          Loan Fine Paid:{" "}
          <span className="font-normal pl-2">{loanFinePaid}</span>
        </p>
        <p className="flex items-center gap-2 ">
          <span>
            <img
              width="22"
              height="22"
              src="https://img.icons8.com/ios/50/calendar--v1.png"
              alt="calendar--v1"
            />
          </span>
          Opening Date :{" "}
          <span className="font-normal ">{dateToString(openingDate)} </span>
        </p>
      </div>
    </div>
  );
};
