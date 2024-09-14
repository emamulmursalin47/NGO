import { useState } from "react";
import { Link } from "react-router-dom";

const TemporaryAssetNav = () => {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="bg-teal-700 text-white">
                <div className="w-full px-2 ">
                    <div className="relative flex  items-center justify-between h-16">

                    <div className="block sm:hidden relative">
                        <button
                        onClick={toggleDropdown}
                        className="ml-4 text-black bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
                        <div className="ml-4 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">


                            <ul className="py-2 text-sm text-black" aria-labelledby="dropdownDefaultButton">


                            <li>
                            <Link to={'/edit_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Edit Temporary Asset</p>
                            </Link>
                            </li>

                            <li>
                            <Link to={'/remove_wasted_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Remove Wasted Temp Asset </p>
                            </Link>
                            </li>

                            <li>
                            <Link to={'/temporary_asset_list'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Temporary Asset List</p>
                            </Link>
                            </li>

                            <li>
                            <Link to={'/add_new_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Add New Temporary Asset</p>
                            </Link>
                            </li>

                            <li>
                            <Link to={'/temporary_asset_item'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Temporary Asset Item</p>
                            </Link>
                            </li>

                            <li>
                            <Link to={'/temporary_asset_types'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Temporary Asset Types</p>
                            </Link>
                            </li>

                            </ul>
                        </div>
                        )}
                    </div>



                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex flex-wrap space-x-2 ">

                                <Link to={'/edit_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Edit Temporary Asset</p>
                                </Link>

                                <Link to={'/remove_wasted_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Remove Wasted Temp Asset </p>
                                </Link>

                                <Link to={'/temporary_asset_list'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Temporary Asset List</p>
                                </Link>

                                <Link to={'/add_new_temporary_asset'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add New Temporary Asset</p>
                                </Link>

                                <Link to={'/temporary_asset_item'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Temporary Asset Item</p>
                                </Link>

                                <Link to={'/temporary_asset_types'}>
                                    <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Temporary Asset Types</p>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default TemporaryAssetNav;