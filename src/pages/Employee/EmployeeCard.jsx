import { dateToString } from "../../utils/DateHelper";
import EditEmployee from "./EdiitEmployee";

const EmployeeCard = ({ data }) => {
  const {
    name,
    fatherName,
    motherName,
    presentAddress,
    permanentAddress,
    educationalQualification,
    dateOfBirth,
    mobileNumber,
    email,
    emergencyContactNumber,
    religion,
    nidNumber,
    photo,
    status,
    spouseName,
    previousOrganization,
    presentPosition,
    guarantorDetails,
    nidDetails,
  } = data;

  console.log(data);

  return (
    <div>
      <section className="p-4 max-w-5xl mx-auto bg-gray-100 md:mt-8 rounded ">
        <div className="flex flex-col md:flex-row gap-10 border-b-4 pb-4 ">
          <div className="">
            <img className=" w-60 object-cover " src={photo} alt="" />
          </div>
          <div className=" space-y-2 p-4 ">
            <h1 className="text-lg md:text-4xl">{name}</h1>
            <p className="md:text-lg">Phone Number: {mobileNumber}</p>
            <p className="font-bold text-green-600">{status}</p>
            <p className="md:text-lg"> NID: {nidDetails.nidNumber}</p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Employee Personal Information
        </h1>


        <section>

          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b  bg-teal-500 text-white ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Title</td>
                  <td className="p-2  text-base font-bold" style={{ width: '60%' }}>Description</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Father Name:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{fatherName}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Mother Name:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{motherName}</td>
                </tr>
                {/* <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Spouse Name:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{spouseName}</td>
                </tr> */}
                <tr className="border-b  ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Present Address:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentAddress}</td>
                </tr>
                <tr className="border-b  ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Permanent Address:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{permanentAddress}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Educational Qualification:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{educationalQualification}</td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Date of Birth:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{dateToString(dateOfBirth)}</td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Email:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{email}</td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Emergency Contact:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{emergencyContactNumber}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Religion:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{religion}</td>
                </tr>

              </tbody>
            </table>

            <div>
              <h3 className="font-bold p-4">Employee Nid Photos: </h3>
              <div className=" flex gap-4 items-center p-2 ">
                <img className=" rounded  h-52  " src={nidDetails.nidPhotoFront} alt="" />
                <img className=" rounded  h-52  " src={nidDetails.nidPhotoBack} alt="" />
              </div>
            </div>

          </div>

        </section >





        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Employee Previous Organization Details
        </h1>

        <section>

          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b  bg-teal-500 text-white ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Title</td>
                  <td className="p-2  text-base font-bold" style={{ width: '60%' }}>Description</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Name:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{previousOrganization.name}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Address:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{previousOrganization.address}</td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Joining Date:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{dateToString(previousOrganization.joiningDate)}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Position:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{previousOrganization.position}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Salary:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{previousOrganization.salary}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Switch Reason:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{previousOrganization.switchReason}</td>
                </tr>

              </tbody>
            </table>

          </div>

        </section >







        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Employee Present Position
        </h1>




        <section>

          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b  bg-teal-500 text-white ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Title</td>
                  <td className="p-2  text-base font-bold" style={{ width: '60%' }}>Description</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Designation:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.designation}</td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Joining Date:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{dateToString(presentPosition.dateOfJoining)}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Salary Amount:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.salaryAmount}</td>
                </tr>

                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Mobile Bill:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.mobileBill}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>TA/DA:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.taDa}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Additional Total:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.additionalTotal}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Employee Security Fund:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{presentPosition.employeeSecurityFund}</td>
                </tr>

              </tbody>
            </table>

          </div>

        </section >


        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Guarantor Information
        </h1>

        <section>
          {/* <div className="">
            <img className=" w-60 object-cover " src={photo} alt="" />
          </div> */}

          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b  bg-teal-500 text-white ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Title</td>
                  <td className="p-2  text-base font-bold" style={{ width: '60%' }}>Description</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Name:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{guarantorDetails.name}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Address:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{guarantorDetails.address}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Relation:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{guarantorDetails.relation}</td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Occupation:</td>
                  <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{guarantorDetails.occupation}</td>
                </tr>

              </tbody>
            </table>

            <div>
              <h3 className="font-bold p-4">Gurantor Nid Photos: </h3>
              <div className=" flex gap-4 items-center p-2 ">
                <img className=" rounded  h-52  " src={guarantorDetails.nidDetails.nidPhotoFront} alt="" />
                <img className=" rounded  h-52  " src={guarantorDetails.nidDetails.nidPhotoBack} alt="" />
              </div>
            </div>

          </div>

        </section >


        <div className=" flex justify-end gap-2  py-4 ">
          <button className="btn btn-xs md:btn-sm bg-teal-700 text-white">
            Print
          </button>
          <EditEmployee data={data} />
          <button className="btn btn-xs md:btn-sm btn-error text-white ">
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmployeeCard;
