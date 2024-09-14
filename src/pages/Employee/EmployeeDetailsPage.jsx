import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { searchEmployeeByPhoneNumber } from "../../../api/admin";
import EmployeeCard from "./EmployeeCard";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetched } = useQuery({
    queryKey: [`employee`,id],
    queryFn: () => searchEmployeeByPhoneNumber(id),
  });
 console.log(data);
  return <div>{isFetched ? <EmployeeCard data={data[0]} /> : null}</div>;
};

export default EmployeeDetailsPage;
