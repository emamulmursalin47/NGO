import { useState } from "react";
import useMutationHook from "../../hooks/useMutationHook";
import { employeeLeaveApplication, employeeLeaveApplicationList } from "../../api/admin";

import { useQuery } from "@tanstack/react-query";
const initialState = {
    days: null,
    reason: '',

};

const EmployeeLeaveApplication = () => {
    const { mutate } = useMutationHook(employeeLeaveApplication, { key: ['application', localStorage.getItem('id')] })
    const { data } = useQuery({
        queryKey: ['application', localStorage.getItem('id')],
        queryFn: () => employeeLeaveApplicationList(localStorage.getItem('id')),
        initialData: []
    })
    const [formData, setFormData] = useState(initialState);
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...formData,
            employeeId: localStorage.getItem('id'),
        }
        console.log(data);
        mutate(data)
    }
    return (
        <div>
            <section>
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                    Leave Application
                </h1>
                <section className=" px-4 grid grid-cols-1 md:grid-cols-1 max-w-5xl mx-auto gap-4 my-8">

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="name">
                            Name:
                        </label>
                        <input

                            className="input input-bordered input-sm  hover:border-teal-500"
                            id="name"
                            type="text"
                            name="name"
                            onChange={onChangeHandle}
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="branchName">
                            Branch Name:
                        </label>
                        <input

                            className="input input-bordered input-sm  hover:border-teal-500"
                            id="branchName"
                            type="text"
                            name="branchName"
                            onChange={onChangeHandle}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="samityName">
                            Samity Name:
                        </label>
                        <input

                            className="input input-bordered input-sm  hover:border-teal-500"
                            id="samityName"
                            type="text"
                            name="samityName"
                            onChange={onChangeHandle}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="number_of_days">
                            Number of Days:
                        </label>
                        <input

                            className="input input-bordered input-sm  hover:border-teal-500"
                            id="days"
                            type="number"
                            name="days"
                            onChange={onChangeHandle}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="date">
                            Date:
                        </label>
                        <input

                            className="input input-bordered input-sm  hover:border-teal-500"
                            id="date"
                            type="date"
                            name="date"
                            onChange={onChangeHandle}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="reason">
                            Reason:
                        </label>

                        <textarea
                            name="reason"
                            id="reason"
                            onChange={onChangeHandle}
                            className="input input-bordered input-lg  hover:border-teal-500  "
                            cols="30" rows="10">
                        </textarea>
                    </div>

                </section>
                <div className="w-full flex flex-col md:flex-row justify-center  mt-8">
                    <button

                        onClick={handleSubmit}
                        className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium     text-white">
                        Submit 1
                    </button>
                </div>
            </section>
            <section>
                {data.length}
            </section>
        </div>
    );
};

export default EmployeeLeaveApplication;