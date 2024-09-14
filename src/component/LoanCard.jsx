import React from "react";
import { Link } from "react-router-dom";

export default function LoanCard({ data }) {
  const {
    paymentTerm,
    loanAmount,
    paid,
    SamityName,
    BranchName,
    UserName,
    photo,
    _id
  } = data;

  return (
    <div className="border   card shadow-lg m-2 rounded-t-lg font-sans">
      <div className="image-full">
        <img className="w-full h-56 p-4 object-cover rounded-t-lg" src={photo} alt="" />
      </div>
      <div className="font-medium space-y-1 card-body p-4 bg-base-100 ">
        <h1 className="card-title">Name: <span>{UserName}</span></h1>
        <h1 className="divider"></h1>
        <h1>Samity Name:  <span className="font-normal text-base">{SamityName}</span></h1>
        <h1>Branch Name: <span className="font-normal text-base">{BranchName}</span></h1>
        <h1>Term: <span className="font-normal text-base">{paymentTerm}</span></h1>
        <h1>Loan Amount: <span className="font-normal text-base">{loanAmount}</span></h1>
        <h1>Paid Amount: <span className="font-normal text-base">{paid}</span></h1>
      </div>
      <div className="card-actions p-4 w-full">
        <Link className="btn btn-sm w-full bg-teal-700 hover:bg-teal-500 card-compact text-white"
          to={`/loan_transaction_posting_details/${_id}`}>
          See More
        </Link>

      </div>
    </div>
  );
}
