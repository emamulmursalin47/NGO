import { useParams } from "react-router-dom";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import { useQuery } from "@tanstack/react-query";
import {
  fdrTransactionList,
  getFdrAccountDetailsById,
} from "../../../api/admin";
import { FdrAccountPerUserDetails } from "./SavingAccountPerUserDetails";
import { useUserType } from "../../../hooks/userContext";
import FdrTransactionsTable from "./FdrTransactionTable";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import { useEffect, useState } from "react";
const initialData = {
  payFrom: null,
  by: null,
};
const FdrTransactionPostingDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialData);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { data } = useQuery({
    queryKey: [`fdr-account-${id}`],
    queryFn: () => getFdrAccountDetailsById(id),
    initialData: [],
    enabled: !!id,
  });
  const { data: transactions } = useQuery({
    queryKey: [`fdr-transactions-${id}`],
    queryFn: () => fdrTransactionList(id),
    initialData: null,
  });
  useEffect(() => {
    setFormData((prev) => ({ ...prev, by: user }));
  }, []);

  return (
    <>
      <section>
        <SavingAccountNav />
      </section>
      <section>
        {data.length ? <FdrAccountPerUserDetails data={data[0]} /> : null}
      </section>
      <section>
        <DrawerBankCashSelector
          samityId={data.length ? data[0].samityId : null}
          callBackFn={setFormData}
          text={"Pay From"}
        />
      </section>
      <section>
        <div className="">
          <section className="mt-12">
            <div>
              <div className="max-w-5xl mx-auto">
                <div className=" bg-teal-700 text-white py-4 mx-1 rounded-t-md  ">
                  <tr className="grid grid-cols-3 md:grid-cols-5  items-center justify-center gap-1 text-start ">
                    <th>SL</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </div>
              </div>
              {transactions
                ? transactions.map((data, idx) => (
                    <FdrTransactionsTable
                      data={data}
                      key={idx}
                      index={idx}
                      additionalData={formData}
                    />
                  ))
                : null}
            </div>
            {/* New */}
          </section>
        </div>
      </section>
    </>
  );
};

export default FdrTransactionPostingDetails;
