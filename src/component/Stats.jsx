

const Stats = ({ data }) => {
    console.log(data);
    const { totalAmount, totalPaid, perInstallment, isFetched } = data;
    return (
        <div>
            {/* <div className="stats flex flex-col md:flex-row w-full shadow bg-base-200">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-teal-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title"> Total Amount</div>
                    <div className="stat-value">{isFetched ? totalAmount : null}</div>
                  
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-teal-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Per Instalment</div>
                    <div className="stat-value">{isFetched ? perInstallment : null}</div>
                  
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-teal-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total Paid</div>
                    <div className="stat-value">{isFetched ? totalPaid : null}</div>
                  
                </div>

            </div> */}
            <section>
                <section className="p-4 my-1 md:p-4 bg-gray-100 text-gray-800 rounded-md">
                    <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                            <div className="flex items-center justify-center px-4 bg-teal-600 text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                                    <path d="M487.938,162.108l-224-128a16,16,0,0,0-15.876,0l-224,128a16,16,0,0,0,.382,28l224,120a16,16,0,0,0,15.112,0l224-120a16,16,0,0,0,.382-28ZM256,277.849,65.039,175.548,256,66.428l190.961,109.12Z"></path>
                                    <path d="M263.711,394.02,480,275.061V238.539L256,361.74,32,238.539v36.522L248.289,394.02a16.005,16.005,0,0,0,15.422,0Z"></path>
                                    <path d="M32,362.667,248.471,478.118a16,16,0,0,0,15.058,0L480,362.667V326.4L256,445.867,32,326.4Z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center justify-between flex-1 p-3">
                                <p className="text-xl font-semibold">{isFetched ? totalAmount : null}</p>
                                <p>Total Amount</p>
                            </div>
                        </div>

                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                            <div className="flex items-center justify-center px-4 bg-teal-600 text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                                    <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384"></polygon>
                                    <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center justify-between flex-1 p-3">
                                <p className="text-xl font-semibold">{isFetched ? perInstallment : null}</p>
                                <p>Per Instalment</p>
                            </div>
                        </div>
                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                            <div className="flex items-center justify-center px-4 bg-teal-600 text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                                    <path d="M256.25,16A240,240,0,0,0,88,84.977V16H56V144H184V112H106.287A208,208,0,0,1,256.25,48C370.8,48,464,141.2,464,255.75S370.8,463.5,256.25,463.5,48.5,370.3,48.5,255.75h-32A239.75,239.75,0,0,0,425.779,425.279,239.75,239.75,0,0,0,256.25,16Z"></path>
                                    <polygon points="240 111.951 239.465 288 368 288 368 256 271.563 256 272 112.049 240 111.951"></polygon>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center justify-between flex-1 p-3">
                                <p className="text-xl font-semibold">{isFetched ? totalPaid : null}</p>
                                <p>Total Paid</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Stats;