

const ForgotPass = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-teal-800">
            <div className="card md:w-96 shrink-0  max-w-sm shadow-2xl bg-base-100 ">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Your Phone Number</span>
                        </label>
                        <input type="number" placeholder="+880" className="input input-bordered" required />
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password here.." className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div> */}
                    <div className="form-control mt-6">
                        <button className="btn  bg-teal-500 hover:bg-teal-700 text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;