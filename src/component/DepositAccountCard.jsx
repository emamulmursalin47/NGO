import {
  DpsAccountsTable,
  FdrAccountsTable,
  SavingsAccountsTable,
} from "./DepositAccountTable";

export function SavingsAccountCard({ data, value }) {
  return (
    <div>
      <div>
        <table className="table ">
          <tbody>
            <SavingsAccountsTable data={{ ...data, value }} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function FdsAccountCard({ data, value }) {
  return (
    <div>
      <div>
        <table className="table ">
          <tbody>
            <FdrAccountsTable data={{ ...data, value }} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function DpsAccountCard({ data, value }) {
  return (
    <div>
      <div>
        <table className="table ">
          <tbody>
            <DpsAccountsTable data={{ ...data, value }} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
