import { useEffect, useState } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import toast from "react-hot-toast";
import { updateUserSettings } from "../../../api/admin";
const initialState = {
  name: "",
  branchId: "",
  samityId: "",
  fathersName: "",
  mothersName: "",
  spouseName: "",
  occupation: "",
  religion: "",
  occupationBrief: "",
  presentAddress: "",
  permanentAddress: "",
  dateOfBirth: "",
  nidNumber: "",
  mobileNumber: "",
  educationalQualification: "SSC",
  emergencyContactNumber: "",
  membershipFee: "",
  photo: "",
  status: "Active",
  fromAdmin: true,
  nominee: {
    name: "",
    address: "",
    relation: "",
    share: "",
    occupation: "",
  },
};

const EditBtn = ({ data }) => {
  const [formData, setFormData] = useState(initialState);
  const { mutate } = useMutationHook(updateUserSettings, {
    key: ["member", data._id],
    onSuccess: () => {
      document.getElementById("my_modal_3").close()
      toast.success("User Settings Updated");
    },
  });
  const handleChangeNominie = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      nominee: {
        ...prevState.nominee,
        [name]: value,
      },
    }));
  };
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);
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
            <section className="m-4">
              <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                Edit Member
              </h1>
              <form className="my-8" action="">
                <section className=" grid grid-cols-1 md:grid-cols-2  max-w-4xl mx-auto gap-4 ">
                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="name">
                      Name:{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="name"
                      value={formData.name}
                      name="name"
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="fathers_name">
                      Father’s Name:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="fathers_name"
                      value={formData.fathersName}
                      type="text"
                      name="fathersName"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="mothers_name">
                      Mother’s Name:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="mothers_name"
                      value={formData.mothersName}
                      type="text"
                      name="mothersName"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="spouse_name">
                      Spouse Name:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="spouse_name"
                      value={formData.spouseName}
                      type="text"
                      name="spouseName"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="occupation">
                      Occupation:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="occupation"
                      value={formData.occupation}
                      type="text"
                      name="occupation"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="religion">
                      Religion:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="religion"
                      value={formData.religion}
                      type="text"
                      name="religion"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium"
                      htmlFor="short_brief_of_occupation"
                    >
                      Short Brief of Occupation:
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="occupationBrief"
                      id="short_brief_of_occupation"
                      value={formData.occupationBrief}
                      cols="10"
                      rows="2"
                      className="input input-bordered input-sm  hover:border-teal-500  "
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="present_address">
                      {" "}
                      Present Address:
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="presentAddress"
                      id=" present_address"
                      value={formData.presentAddress}
                      cols="10"
                      rows="2"
                      className="input input-bordered input-sm  hover:border-teal-500"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor=" permanent_address">
                      {" "}
                      Permanent Address:
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="permanentAddress"
                      id="  permanent_address"
                      value={formData.permanentAddress}
                      cols="10"
                      rows="2"
                      className="input input-bordered input-sm  hover:border-teal-500"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="nid_number">
                      NID Number:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="nid_number"
                      value={formData.nidNumber}
                      type="number"
                      name="nidNumber"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="mobile_number">
                      Mobile Number:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="mobile_number"
                      value={formData.mobileNumber}
                      type="number"
                      placeholder="+880"
                      name="mobileNumber"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="emergency_number">
                      Emergency Contact Number:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="emergency_number"
                      value={formData.emergencyContactNumber}
                      type="number"
                      placeholder="+880"
                      name="emergencyContactNumber"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="membership_fee ">
                      Membership Fee:
                    </label>
                    <input
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="membership_fee "
                      value={formData.membershipFee}
                      type="number"
                      name="membershipFee"
                    />
                  </div>

                  {/* <div className="flex flex-col gap-1">
                                        <label className="font-medium" htmlFor="membership_fee ">
                                            DOB (DD/MM/YYYY):
                                        </label>
                                        <DatePicker
                                            selected={formData.dateOfBirth}
                                            onChange={handleChangeDate}
                                            className="input input-bordered input-sm  hover:border-teal-500 w-full"
                                            dateFormat="dd/MM/yyyy"
                                        />

                                    </div> */}

                  {/* Education Qualification */}
                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="Attach_Photo ">
                      Education Qualification:
                    </label>
                    <select
                      onChange={handleChange}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      name="educationalQualification"
                      value={formData.educationalQualification}
                    >
                      <option disabled defaultValue>
                        --Select Education Qualification--
                      </option>
                      <option value="SSC">SSC</option>
                      <option value="HSC">HSC</option>
                      <option value="B.A">B.A</option>
                      <option value="M.A">M.A</option>
                      <option value="NONE">NONE</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="Attach_Photo ">
                      Attach Photo:
                    </label>
                    <input
                      onChange={handleChange}
                      className="fill-black hover:border-teal-500 "
                      id="Attach_Photo "
                      type="file"
                      name="photo"
                    />
                  </div>
                </section>
                {/* nominee section */}
                <section>
                  <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                    Edit Nominee Section
                  </h1>
                  <section className=" grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 my-8">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="name">
                        Name:{" "}
                      </label>
                      <input
                        onChange={handleChangeNominie}
                        className="input input-bordered input-sm  hover:border-teal-500"
                        id="name"
                        value={formData.nominee.name}
                        type="text"
                        name="name"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-medium"
                        htmlFor=" permanent_address"
                      >
                        {" "}
                        Address:
                      </label>
                      <input
                        onChange={handleChangeNominie}
                        name="address"
                        id="address"
                        value={formData.nominee.address}
                        cols="10"
                        rows="2"
                        className="input input-bordered input-sm  hover:border-teal-500  "
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-medium"
                        htmlFor="relation_with_member"
                      >
                        Relation with Member:{" "}
                      </label>
                      <input
                        onChange={handleChangeNominie}
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="relation_with_member"
                        value={formData.nominee.relation}
                        type="text"
                        name="relation"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="share">
                        Share %:{" "}
                      </label>
                      <input
                        onChange={handleChangeNominie}
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="share"
                        value={formData.nominee.share}
                        type="number"
                        name="share"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-medium" htmlFor="occupation">
                        Occupation:
                      </label>
                      <input
                        onChange={handleChangeNominie}
                        className="input input-bordered input-sm  hover:border-teal-500  "
                        id="occupation"
                        value={formData.nominee.occupation}
                        type="text"
                        name="occupation"
                      />
                    </div>
                  </section>
                </section>

                <section></section>
                {/* {isError ? errorMessage : null} */}
                <div className="w-full flex flex-col md:flex-row justify-center  mt-8">
                  <button
                    onClick={handleSubmit}
                    className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium     text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </section>
        </div>
      </dialog>
    </div>
  );
};

export default EditBtn;
