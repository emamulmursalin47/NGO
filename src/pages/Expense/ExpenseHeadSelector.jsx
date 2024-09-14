import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllExpenseHead } from "../../../api/admin";
export default function ExpenseHeadSelector({ callBackFn }) {
  const { data, isFetched } = useQuery({
    queryKey: ["expense_head"],
    queryFn: getAllExpenseHead,
  });
  const handleBankChange = async (event) => {
    callBackFn((prev) => ({
      ...prev,
      headId: event.target.value,
    }));
  };

  return (
    <>
      {/* Head List */}

      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="name">
          Head :{" "}
        </label>
        <select
          onChange={handleBankChange}
          className="input input-bordered input-sm hover:border-teal-500  "
        >
          <option disabled selected>
            Select Head
          </option>
          {isFetched
            ? data.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.name}
                </option>
              ))
            : null}
        </select>
      </div>
    </>
  );
}
