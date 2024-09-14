import React from "react";

const formatAmount = (amount) => amount.toLocaleString("en-US") + " TK";

const TrialBalanceTable = ({ data }) => {
  const assetEntries = data.assets.map((item) => ({
    name: item.headName,
    amount: item.totalSum,
  }));

  const debitEntries = [
    { name: "Cash in Hand", amount: data.drawerCash },
    { name: "Cash at Bank", amount: data.bankCash },
    { name: "Loans Receivable", amount: data.loanReceiveAble },
    ...assetEntries,
  ];

  const creditEntries = [
    { name: "Member Savings Accounts", amount: data.savings },
    { name: "Membership and Form Fees", amount: data.userFromAndMemberShipFee },
    { name: "FDR Accounts", amount: data.fdr },
    { name: "DPS Accounts", amount: data.dps },
    { name: "Employee Security Fund", amount: data.employeeSecurityFund },
    { name: "Loan from NGO", amount: data.ngoLoanReceived },
    { name: "Initial Capital", amount: data.initialCapital },
  ];

  const expenseEntries = data.expense.items.map((item) => ({
    name: item.name,
    amount: item.amount,
  }));

  const totalDebit =
    debitEntries.reduce((sum, entry) => sum + entry.amount, 0) +
    data.expense.total;
  const totalCredit = creditEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Account Name</th>
            <th className="px-6 py-3 text-right">Debit</th>
            <th className="px-6 py-3 text-right">Credit</th>
          </tr>
        </thead>
        <tbody>
          {debitEntries.map((entry, index) => (
            <tr key={`debit-${index}`} className="border-b">
              <td className="px-6 py-4">{entry.name}</td>
              <td className="px-6 py-4 text-right">
                {formatAmount(entry.amount)}
              </td>
              <td className="px-6 py-4 text-right"></td>
            </tr>
          ))}
          {creditEntries.map((entry, index) => (
            <tr key={`credit-${index}`} className="border-b">
              <td className="px-6 py-4">{entry.name}</td>
              <td className="px-6 py-4 text-right"></td>
              <td className="px-6 py-4 text-right">
                {formatAmount(entry.amount)}
              </td>
            </tr>
          ))}
          {expenseEntries.map((entry, index) => (
            <tr key={`expense-${index}`} className="border-b">
              <td className="px-6 py-4">{entry.name}</td>
              <td className="px-6 py-4 text-right">
                {formatAmount(entry.amount)}
              </td>
              <td className="px-6 py-4 text-right"></td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="px-6 py-4">TOTAL</td>
            <td className="px-6 py-4 text-right">{formatAmount(totalDebit)}</td>
            <td className="px-6 py-4 text-right">
              {formatAmount(totalCredit)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrialBalanceTable;
