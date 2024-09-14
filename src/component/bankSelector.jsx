import { useState } from "react";
import { getAllBank } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";
export default function BankSelector({ callBackFn }) {
  const { data, isFetched } = useQuery({
    queryKey: ["bank"],
    queryFn: getAllBank,
  });
  const [selectedBank, setSelectedBank] = useState("");
  const handleBankChange = async (event) => {
    setSelectedBank(event.target.value);
    callBackFn((prev) => ({
      ...prev,
      bankId: event.target.value,
    }));
  };

  return (
    <>
      {/* Bank List */}

      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="name">
          Bank Name:{" "}
        </label>
        <select
          onChange={handleBankChange}
          className="input input-bordered input-sm hover:border-teal-500  "
        >
          <option disabled selected>
            Select Bank
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
