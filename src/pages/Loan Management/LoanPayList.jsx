import { useQuery } from "@tanstack/react-query";
import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import { ngoLoanList } from "../../../api/admin";
import LoanPayCardView from "./LoanPayCardView";

const LoanPayList = () => {
    const { data, isFetched } = useQuery({
        queryKey: ["ngo-loan"],
        queryFn: ngoLoanList,
    });
    console.log(data);

    return (
        <div>
            <LoanManagementNav />
            <section className="max-w-5xl mx-auto">
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 pl-2 ">NGO Loan Pay Details</h1>
                <div className="grid grid-col-1 md: grid-col-2 lg:grid-cols-3 gap-4 p-4">
                    {
                        isFetched ?
                            data.map((data, idx) => <LoanPayCardView data={data} key={idx} />)
                            : null
                            
                    }
                </div>
            </section>

        </div>
    );
};

export default LoanPayList;
