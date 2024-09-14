

const DashBoardAdmin = () => {
    return (
        <div className="flex flex-col gap-10 justify-center items-center   bg-gray-100 md:py-10 sm:py-10 min-h-screen no-scrollbar">

            <section className="flex flex-col md:flex-row gap-6 p-4 md:p-0">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="avatar">
                        <div className="w-14 rounded-full ring ring-teal-500 ring-offset-base-100 ring-offset-2">
                            <img src="https://source.unsplash.com/100x100/?portrait" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-medium">Master Admin</h1>
                        <p>ID: 50174</p>
                    </div>
                </div>
                <ul className="menu bg-base-300 lg:menu-horizontal items-center  rounded-box">
                    <li>
                        <a className="hover:bg-teal-500 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Notification
                            <span className="badge badge-sm">99+</span>
                        </a>
                    </li>
                    <li>
                        <a className="hover:bg-teal-500 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Updates
                            <span className="badge badge-sm badge-warning">NEW</span>
                        </a>
                    </li>
                    <li>
                        <a className="hover:bg-teal-500 hover:text-white">
                            Stats
                            <span className="  badge badge-xs badge-info"></span>
                        </a>
                    </li>
                    <div>
                        {/* <label className="flex cursor-pointer gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label> */}
                    </div>
                </ul>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 w-fit p-4 pt-0 md:p-0   ">
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md md:col-span-2 transform hover:scale-105 duration-500 ">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Total capital.png" alt="" />
                    </div>
                    <div>
                        <p className="font-light">Total Capital</p>
                        <h2 className="text-2xl font">4,70,000 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Number of center.png  " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Number of Center</p>
                        <h2 className="text-2xl font">14</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Loan in field.png  " alt="" />
                    </div>
                    <div>
                        <p className="font-light"> Loan in Field</p>
                        <h2 className="text-2xl font">15,000 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Total collection.png " alt="" />
                    </div>
                    <div>
                        <p className="font-light"> Today Collection</p>
                        <h2 className="text-2xl font">34,00 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Total members.png  " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Total Members</p>
                        <h2 className="text-2xl font">54</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Balance in bank.png  " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Balance  in Bank</p>
                        <h2 className="text-2xl font">1,34,000 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/drawer cash.png " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Drawer Cash</p>
                        <h2 className="text-2xl font">45,000 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Regular loan.png " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Regular </p>
                        <h2 className="text-2xl font">14,000 Tk</h2>
                    </div>
                </div>
                {/* card */}
                <div className="bg-teal-700 hover:bg-teal-500 text-white p-4 rounded-md transform hover:scale-105 duration-500">
                    <div>
                        <img className="w-10" src="/Admin Dashboard icon/Irregular loan.png " alt="" />
                    </div>
                    <div>
                        <p className="font-light">Irregular Loan</p>
                        <h2 className="text-2xl font">4,000 Tk</h2>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default DashBoardAdmin;