import React from "react";

const formatAmount = (amount, isNegative = false) =>
  isNegative
    ? `(${Math.abs(amount).toLocaleString("en-US")}) TK`
    : `${amount.toLocaleString("en-US")} TK`;

const IncomeExpenseTable = ({ data }) => {
  const isNetIncome = data.netIncome >= 0;
  const netIncomeAbsolute = Math.abs(data.netIncome);

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3" colSpan="2">
              INCOME
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.income.items).map(([key, value], index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{key}</td>
              <td className="px-6 py-4 text-right">{formatAmount(value)}</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="px-6 py-4">Total Income</td>
            <td className="px-6 py-4 text-right">
              {formatAmount(data.income.total)}
            </td>
          </tr>
        </tbody>
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3" colSpan="2">
              EXPENSES
            </th>
          </tr>
        </thead>
        <tbody>
          {data.expenses.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4 text-right">
                {formatAmount(item.amount)}
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="px-6 py-4">Total Expenses</td>
            <td className="px-6 py-4 text-right">
              {formatAmount(data.expenses.total)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr
            className={`font-bold ${
              isNetIncome ? "text-green-700" : "text-red-700"
            }`}
          >
            <td className="px-6 py-4">
              {isNetIncome ? "Net Income" : "Net Loss"}
            </td>
            <td className="px-6 py-4 text-right">
              {formatAmount(netIncomeAbsolute, !isNetIncome)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default IncomeExpenseTable;
