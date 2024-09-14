import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BranchSamitySelector from "../../component/branchSamitySelector";
import ExpenseNav from "./ExpenseNav/ExpenseNav";
import { getAllExpenses, getAllAssets } from "../../../api/admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateToString } from "../../utils/DateHelper";

const initialState = {
  branchId: null,
  samityId: null,
  from: null,
  to: null,
};

const AllAsset = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: [
      "expense-list",
      formData.branchId,
      formData.samityId,
      formData.from,
      formData.to,
    ],
    queryFn: () => getAllAssets(formData),
    enabled: !!formData.branchId && !!formData.samityId,
    initialData: null,
  });
  console.log(data);

  function handleChangeFrom(date) {
    setFormData((prev) => ({ ...prev, from: date }));
  }

  function handleChangeTo(date) {
    setFormData((prev) => ({ ...prev, to: date }));
  }

  useEffect(() => {
    const branchId = searchParams.get("branchId");
    const samityId = searchParams.get("samityId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (branchId && samityId) {
      setFormData({
        branchId,
        samityId,
        from: from ? new Date(from) : null,
        to: to ? new Date(to) : null,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.branchId && formData.samityId) {
      const params = {
        branchId: formData.branchId,
        samityId: formData.samityId,
        from: formData.from ? formData.from.toISOString().split("T")[0] : "",
        to: formData.to ? formData.to.toISOString().split("T")[0] : "",
      };
      setSearchParams(params);
    }
  }, [formData, setSearchParams]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ExpenseNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-4 border-teal-500">
          All Assets
        </h1>

        <div>
          <div className="mb-8 flex">
            <BranchSamitySelector callBackFn={setFormData} />
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="from-date"
              >
                From (DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.from}
                onChange={handleChangeFrom}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="to-date"
              >
                To (DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.to}
                onChange={handleChangeTo}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>

        {data && data.length ? (
          <AssetTable data={data} />
        ) : (
          <div className="text-center py-12 bg-white shadow-md rounded-lg mt-4">
            <p className="text-gray-500 text-lg">No Assets found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AssetTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Sl No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Head Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Unit Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {dateToString(item.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.headName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.unitAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.unitPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                <Link
                  to={`/phonenumber/${item.by.phone}`}
                  className="text-teal-600 hover:text-teal-900"
                >
                  {item.by.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAsset;
