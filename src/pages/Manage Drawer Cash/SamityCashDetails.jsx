import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { drawerCashDetailsBySamityId } from "../../../api/admin";
import SamityDrawerCashTable from "./SamityDrawerCashTable";
import ManageDrawerCashNav from "./ManageDrawerCashNav/ManageDrawerCashNav";

export default function SamityCashDetails() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [`samityCashDetails`, id],
    queryFn: () => drawerCashDetailsBySamityId(id),
    initialData: [],
  });
  console.log(data);
  return (
    <section>
      <section>
        <ManageDrawerCashNav />
      </section>
      <div className="mt-4">
        <div className="max-w-5xl mx-auto">
          <div className=" bg-teal-700 text-white py-4 mx-1 rounded-t-md  ">
            <tr className="grid grid-cols-3 md:grid-cols-5  items-center justify-center gap-1 text-start ">
              <th>Sl.</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Source</th>
              <th>By</th>
            </tr>
          </div>
        </div>
        {data.length
          ? data.map((data, idx) => (
              <SamityDrawerCashTable data={data} key={idx} index={idx} />
            ))
          : null}
      </div>
    </section>
  );
}
