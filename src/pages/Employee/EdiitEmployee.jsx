import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import BranchSamitySelector from "../../component/branchSamitySelector";
import  useMutationHook from '../../../hooks/useMutationHook'
import { updateEmployeeSettings } from "../../../api/admin";
import toast from "react-hot-toast";
const initialState = {
  name: "",
  fatherName: "",
  motherName: "",
  presentAddress: "",
  permanentAddress: "",
  educationalQualification: "HSC",
  dateOfBirth: "",
  mobileNumber: "",
  email: "",
  emergencyContactNumber: "",
  religion: "Islam",
  nidNumber: "",
  photo: "",
  branchId: "",
  samityId: "",
  previousOrganization: {
    name: "",
    address: "",
    joiningDate: "",
    position: "",
    salary: "",
    switchReason: "",
  },
  presentPosition: {
    designation: "Senior",
    dateOfJoining: "",
    salaryAmount: "",
    mobileBill: "",
    taDa: "",
    additionalTotal: "",
    employeeSecurityFund: "",
  },
  guarantorDetails: {
    name: "",
    address: "",
    relation: "",
    occupation: "",
  },
};

const EditEmployee = ({ data }) => {
  const [formData, setFormData] = useState(initialState);
  const {mutate} = useMutationHook(updateEmployeeSettings,{
    key: ['employee',data._id],
    onSuccess: () => {
      document.getElementById("my_modal_3").close()
      toast.success("Employee Setting Updated.")
    }
  })
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: new Date(date),
    }));
  };
  const previousHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      previousOrganization: {
        ...prev.previousOrganization,
        [name]: value,
      },
    }));
    
  };

  const handleChangeDatePrevious = (date) => {
    setFormData((prev) => ({
      ...prev,
      previousOrganization: {
        ...prev.previousOrganization,
        joiningDate: date,
      },
    }));
  };

  const handleChangeDatePrensentPosition = (date) => {
    setFormData((prev) => ({
      ...prev,
      presentPosition: {
        ...prev.presentPosition,
        dateOfJoining: date,
      },
    }));
  };

  const handleChangePresent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      presentPosition: {
        ...prev.presentPosition,
        [name]: value,
      },
    }));
  };
  const handleChangeGurantor = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      guarantorDetails: {
        ...prev.guarantorDetails,
        [name]: value,
      },
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData)
  }
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);
  console.log(formData);
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-sm  btn-success text-white"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Edit
      </button>
      <dialog id="my_modal_3" className="modal ">
        <div className=" modal-scroll modal-box max-w-4xl w-full h-full  ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="flex btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <span className="bg-red-500 p-2 text-white rounded-full">✕ </span>
              close
            </button>
          </form>
          {/* main container */}
          <section>
            <section>
              <section className="m-4">
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                  Employee Edit{" "}
                </h1>
                <form className="my-8">
                  <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="name">
                        Name:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        type="text"
                        placeholder="enter your name"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="father_name">
                        Father Name:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="father_name"
                        value={formData.fatherName}
                        name="fatherName"
                        onChange={handleChange}
                        type="text"
                        placeholder="enter your father name"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="mother_name">
                        Mother Name:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="mother_name"
                        value={formData.motherName}
                        name="motherName"
                        onChange={handleChange}
                        type="text"
                        placeholder="enter your mother name"
                      />
                    </div>

                    {/* <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="spouse_name">
                  Spouse Name :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="spouse_name"
                  name="spouseName"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your spouse name"
                />
              </div> */}
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="nid_number">
                        NID Number:
                      </label>
                      <input
                        onChange={handleChange}
                        className="border-2 hover:border-teal-500 rounded "
                        id="nid_number"
                        value={formData.nidNumber}
                        type="number"
                        name="nidNumber"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="present_address">
                        {" "}
                        Present Address:
                      </label>
                      <textarea
                        className="input input-bordered hover:border-teal-500 "
                        id=" present_address"
                        value={formData.presentAddress}
                        name="presentAddress"
                        onChange={handleChange}
                        cols="10"
                        rows="1"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-medium"
                        htmlFor="permanent_address"
                      >
                        {" "}
                        Permanent Address:
                      </label>
                      <textarea
                        className="input input-bordered hover:border-teal-500 "
                        id=" permanent_address"
                        value={formData.permanentAddress}
                        name="permanentAddress"
                        onChange={handleChange}
                        cols="10"
                        rows="1"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium " htmlFor="occupation">
                        Educational Qualification:
                      </label>
                      <select
                        name="educationalQualification"
                        onChange={handleChange}
                        value={formData.educationalQualification}
                        className=" input input-bordered input-sm hover:border-teal-500 "
                      >
                        <option disabled defaultValue>
                          --Select--
                        </option>
                        <option value="HSC">HSC</option>
                        <option value="BA">BA</option>
                        <option value="Bcom">Bcom</option>
                        <option value="BBA">BBA</option>
                        <option value="BSc">BSc</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="membership_fee ">
                        DOB (DD/MM/YYYY):
                      </label>
                      <DatePicker
                        selected={formData.dateOfBirth}
                        onChange={handleChangeDate}
                        className="border-2 hover:border-teal-500 rounded "
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="mobile_no">
                        Mobile Number:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="mobile_no"
                        value={formData.mobileNumber}
                        name="mobileNumber"
                        onChange={handleChange}
                        type="text"
                        placeholder="enter your mobile number"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="email">
                        Email:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="enter your email"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-medium"
                        htmlFor="emergency_contact_number"
                      >
                        Emergency Contact Number:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="emergency_contact_number"
                        value={formData.emergencyContactNumber}
                        name="emergencyContactNumber"
                        onChange={handleChange}
                        type="text"
                        placeholder="enter emergency contact number"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium " htmlFor="religion">
                        Religion:
                      </label>
                      <select
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        className=" input input-bordered input-sm hover:border-teal-500 "
                      >
                        <option disabled defaultValue>
                          --Select--
                        </option>
                        <option value="Islam">Islam</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Buddhism">Buddhism</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="Attach_Photo ">
                        Attach Photo:
                      </label>
                      <input
                        className="input input_bordered  hover:border-teal-500 "
                        id="Attach_Photo "
                        name="photo"
                        onChange={handleChange}
                        type="file"
                      />
                    </div>

                    {/* <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="status">
                  Status :
                </label>
                <select
                  name="status"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="Working">Working</option>
                  <option value="Resigned">Resigned</option>
                </select>
              </div> */}
                  </section>
                </form>
              </section>

              {/* Previous Organization Section */}
              <section className="m-4">
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                  Previous Organization{" "}
                </h1>
                <form className="my-8">
                  <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="name">
                        Name:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="name"
                        value={formData.previousOrganization.name}
                        name="name"
                        onChange={previousHandleChange}
                        type="text"
                        placeholder="enter your name"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="address">
                        {" "}
                        Address:
                      </label>
                      <textarea
                        className="input input-bordered hover:border-teal-500 "
                        id="address"
                        value={formData.previousOrganization.address}
                        name="address"
                        onChange={previousHandleChange}
                        cols="10"
                        rows="1"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium">
                        Joining Date (DD/MM/YYYY):
                      </label>
                      <DatePicker
                        selected={formData.previousOrganization.joiningDate}
                        onChange={handleChangeDatePrevious}
                        className="input input-bordered input-sm  hover:border-teal-500 w-full"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="position">
                        Position:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="position"
                        value={formData.previousOrganization.position}
                        name="position"
                        onChange={previousHandleChange}
                        type="text"
                        placeholder=""
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="salary">
                        Salary:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="salary"
                        value={formData.previousOrganization.salary}
                        name="salary"
                        onChange={previousHandleChange}
                        type="text"
                        placeholder=""
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="switch_reason">
                        Switch Reason:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="switch_reason"
                        value={formData.previousOrganization.switchReason}
                        name="switchReason"
                        onChange={previousHandleChange}
                        type="text"
                        placeholder="write your reason here"
                      />
                    </div>
                  </section>
                </form>
              </section>

              {/* Present Position Section */}
              <section className="m-4">
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                  Present Position{" "}
                </h1>
                <form className="my-8">
                  <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium " htmlFor="designation">
                        Designation:
                      </label>
                      <select
                        name="designation"
                        value={formData.presentPosition.designation}
                        onChange={handleChangePresent}
                        className=" input input-bordered input-sm hover:border-teal-500 "
                      >
                        <option disabled defaultValue>
                          --Select--
                        </option>
                        <option value="Senior">Senior</option>
                        <option value="Mid">Mid</option>
                        <option value="Junior">Junior</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="membership_fee ">
                        Date Of Joining (DD/MM/YYYY):
                      </label>
                      <DatePicker
                        selected={formData.presentPosition.dateOfJoining}
                        onChange={handleChangeDatePrensentPosition}
                        className="input input-bordered input-sm  hover:border-teal-500 w-full"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <BranchSamitySelector callBackFn={setFormData} />

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="salary_amount">
                        Salary Amount:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="salary_amount"
                        value={formData.presentPosition.salaryAmount}
                        name="salaryAmount"
                        onChange={handleChangePresent}
                        type="text"
                        placeholder="auto calculated"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="mobile_bill">
                        Mobile Bill:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="mobile_bill"
                        value={formData.presentPosition.mobileBill}
                        name="mobileBill"
                        onChange={handleChangePresent}
                        type="text"
                        placeholder="auto calculated"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="salary_amount">
                        TA/DA:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="salary_amount"
                        value={formData.presentPosition.taDa}
                        name="taDa"
                        onChange={handleChangePresent}
                        type="text"
                        placeholder="auto calculated"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="additional_total">
                        Additional Total:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="additional_total"
                        value={formData.presentPosition.additionalTotal}
                        name="additionalTotal"
                        onChange={handleChangePresent}
                        type="text"
                        placeholder="auto calculated"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-medium"
                        htmlFor="employee_security_fund"
                      >
                        Employee Security Fund:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="employee_security_fund"
                        value={formData.presentPosition.employeeSecurityFund}
                        name="employeeSecurityFund"
                        onChange={handleChangePresent}
                        type="text"
                        placeholder="Enter your security money deposite"
                      />
                    </div>
                  </section>
                </form>
              </section>

              {/* Guarantor Section */}
              <section className="m-4">
                <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                  Guarantor Details{" "}
                </h1>
                <form className="my-8">
                  <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="name">
                        Name:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="name"
                        value={formData.guarantorDetails.name}
                        name="name"
                        onChange={handleChangeGurantor}
                        type="text"
                        placeholder="Enter gurantor name"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="address">
                        {" "}
                        Address:
                      </label>
                      <textarea
                        className="input input-bordered hover:border-teal-500 "
                        id=" address"
                        value={formData.guarantorDetails.address}
                        name="address"
                        onChange={handleChangeGurantor}
                        cols="10"
                        rows="1"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="relation">
                        Relation:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="relation"
                        value={formData.guarantorDetails.relation}
                        name="relation"
                        onChange={handleChangeGurantor}
                        type="text"
                        placeholder="Enter your relation with gurantor"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="occupation">
                        Occupation:
                      </label>
                      <input
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="occupation"
                        value={formData.guarantorDetails.occupation}
                        name="occupation"
                        onChange={handleChangeGurantor}
                        type="text"
                        placeholder="Enter gurantor occupation"
                      />
                    </div>
                  </section>
                </form>
              </section>
              <div className="w-fit mx-auto m-8">
                <button
                  className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </section>
          </section>
        </div>
      </dialog>
    </div>
  );
};

export default EditEmployee;
