import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUserByPhoneNumber } from "../../../api/admin";
import MemberCards from "./MemberCards";
import { useQuery } from "@tanstack/react-query";
const MemberDetailsPage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    initialData: null,
    queryKey: ["member", id],
    queryFn: async () => {
      const data = await searchUserByPhoneNumber(id);
      return data[0];
    },
  });

  return <div>{data ? <MemberCards data={data} /> : null}</div>;
};

export default MemberDetailsPage;
