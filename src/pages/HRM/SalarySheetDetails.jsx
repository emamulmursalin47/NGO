import { useLocation } from "react-router-dom";


const SalarySheetDetails = () => {
    const location = useLocation();
    const { data } = location.state;
    console.log(data);
    const { _id, basicSalary, mobileBill, tourBill, overTime, specialAward, bonus, total, totalPaid, due, name, deduction } = data

    return (
        <section className="p-4 max-w-5xl mx-auto  md:mt-8 rounded ">
            <div className="flex flex-col md:flex-row gap-4 border-b-4 pb-4">

                <div className=" space-y-2 p-4 ">
                    <h1 className="md:text-4xl">{name}</h1>
                </div>
            </div>
            <div className=" font-bold grid grid-cols-1 md:grid-cols-4 py-4 space-y-3 tracking-wide ">
                <p>Basic Salary: <br /> <span className="font-normal text-base ">{basicSalary}</span></p>
                <p>Mobile Bill: <br /> <span className="font-normal text-base ">{mobileBill}</span></p>
                <p>Tour Bill: <br /> <span className="font-normal text-base ">{tourBill}</span></p>
                <p>Over Time: <br /> <span className="font-normal text-base ">{overTime}</span></p>
                <p>Special Award: <br /> <span className="font-normal text-base ">{specialAward}</span></p>
                <p>Bonus: <br /> <span className="font-normal text-base ">{bonus}</span></p>
                <p>Total: <br /> <span className="font-normal text-base ">{total}</span></p>
                <p>Total Paid: <br /> <span className="font-normal text-base ">{totalPaid}</span></p>
                <p>Due: <br /> <span className="font-normal text-base ">{due}</span></p>
            </div>

            <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                Deduction
            </h1>
            <div className=" font-bold grid grid-cols-1 md:grid-cols-4 py-4 space-y-3 tracking-wide ">
                <p>Advance: <br /> <span className="font-normal text-base ">{deduction.advance}</span></p>
                <p>Ait: <br /> <span className="font-normal text-base ">{deduction.ait}</span></p>
                <p>Provident Fund: <br /> <span className="font-normal text-base ">{deduction.providentFund}</span></p>
                <p>Absent: <br /> <span className="font-normal text-base ">{deduction.absent}</span></p>
                <p>Others: <br /> <span className="font-normal text-base ">{deduction.others}</span></p>
            </div>
            <div className="divider"></div>

        </section>
    );
};

export default SalarySheetDetails;