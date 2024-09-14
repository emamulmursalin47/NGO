import React from "react";

const BalanceSheetData = ({ data }) => {
  console.log(data);

  const formatAmount = (amount, name) =>
    name !== "Retained Earnings"
      ? amount.toLocaleString("en-US") + " TK"
      : amount >= 0
      ? `${Math.abs(amount).toLocaleString("en-US")} TK`
      : `(${Math.abs(amount).toLocaleString("en-US")}) TK`;

  const renderSection = (title, items) => (
    <>
      <tr className="border-b">
        <td colSpan="2" className="px-6 py-4 font-medium">
          {title}:
        </td>
      </tr>
      {items.map((item, index) => (
        <tr key={`${title}-${index}`} className="border-b">
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4 text-right">
            {formatAmount(item.amount, item.name)}
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">ASSETS (DEBIT)</th>
            <th className="px-6 py-3 text-right">AMOUNT</th>
            <th className="px-6 py-3">LIABILITIES & EQUITY (CREDIT)</th>
            <th className="px-6 py-3 text-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="align-top">
              <table className="w-full">
                <tbody>
                  {renderSection("Current Assets", data.assets.currentAssets)}
                  {renderSection("Fixed Assets", data.assets.fixedAssets)}
                  {renderSection(
                    "Provision of Expenses",
                    data.assets.provisionOfExpenses
                  )}
                </tbody>
              </table>
            </td>
            <td colSpan="2" className="align-top">
              <table className="w-full">
                <tbody>
                  {renderSection(
                    "Current Liabilities",
                    data.liabilitiesAndEquity.currentLiabilities
                  )}
                  {renderSection("Equity", data.liabilitiesAndEquity.equity)}
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="px-6 py-4">TOTAL</td>
            <td className="px-6 py-4 text-right">
              {formatAmount(data.assets.total, "Total")}
            </td>
            <td className="px-6 py-4">TOTAL</td>
            <td className="px-6 py-4 text-right">
              {formatAmount(data.liabilitiesAndEquity.total, "Total")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetData;
