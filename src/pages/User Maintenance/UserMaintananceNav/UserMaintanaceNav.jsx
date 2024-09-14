import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const UserMaintanaceNav = () => {

  const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div>
      <nav className="bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">


        <div className="block sm:hidden relative">
                <button
                  onClick={toggleDropdown}
                  className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button">

                  Select Menu
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                      
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">


                    <ul className="py-2 text-sm text-black" aria-labelledby="dropdownDefaultButton">


                      <li>
                      <NavLink to={'/add_new_user'}>
                      <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-normal">Add New User</p>
                      </NavLink>
                      </li>

                      <li>
                      <NavLink to={'/add_new_user_type'}>
                      <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-normal">Add New User Type</p>
                      </NavLink>
                      </li>

                      <li>
                      <NavLink to={'/user_list'}>
                      <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-normal">User List</p>
                      </NavLink>
                      </li>

                      <li>
                      <NavLink to={'/user_type'}>
                      <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-normal">User Type</p>
                      </NavLink>
                      </li>

                    </ul>
                  </div>
                )}
              </div>



          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              
              <NavLink to={'/add_new_user'}>
              <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium">Add New User</p>
              </NavLink>

              <NavLink to={'/add_new_user_type'}>
              <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium">Add New User Type</p>
              </NavLink>

              <NavLink to={'/user_list'}>
              <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium">User List</p>
              </NavLink>

              <NavLink to={'/user_type'}>
              <p className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium">User Type</p>
              </NavLink>

            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default UserMaintanaceNav;