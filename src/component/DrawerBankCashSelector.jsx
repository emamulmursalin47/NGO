import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBank } from "../../api/admin";

export default function DrawerBankCashSelector({ samityId, callBackFn, text }) {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const { data: banks, isFetched } = useQuery({
    queryKey: ["bank"],
    queryFn: getAllBank,
    initialData: [],
    enabled: !!samityId,
  });

  useEffect(() => {
    if (isFetched) {
      const bankData = banks.map((bank) => ({
        _id: bank._id,
        type: "bank",
        name: bank.name,
      }));

      const ar = [
        { _id: samityId, type: "drawer", name: "Drawer" },
        ...bankData,
      ];
      setData(ar);
    }
  }, [isFetched, samityId, banks]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    try {
      const selectedObject = JSON.parse(selectedValue);
      callBackFn((prev) => ({ ...prev, payFrom: selectedObject }));
      console.log(selectedObject);
    } catch (e) {
      console.error("Invalid JSON:", selectedValue);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium" htmlFor="name">
        {`${text} :`}
      </label>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="input input-bordered input-sm hover:border-teal-500"
      >
        <option value="" disabled>
          Select Payment
        </option>
        {data.map((item, idx) => (
          <option key={idx} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
