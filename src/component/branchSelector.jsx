import { useState } from "react";
import { getAllBranches } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";

export default function BranchSelector({ callBackFn }) {
  const { data, isFetched } = useQuery({
    queryFn: getAllBranches,
  });
  const handleBranchChange = async (event) => {
    console.log(event.target.value);
    callBackFn((prev) => ({ ...prev, branchId: event.target.value }));
  };

  return (
    <div className="flex  flex-col gap-1 w-full">
      {/* Branch List */}

      <label className="" htmlFor="name">
        Branch Name:{" "}
      </label>
      <select
        onChange={handleBranchChange}
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>
          Select Branch
        </option>
        {isFetched
          ? data.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.branchName}
            </option>
          ))
          : null}
      </select>
    </div>
  );
}
