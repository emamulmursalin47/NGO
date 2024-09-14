

const Registration = () => {
    return (
        <div>
            <section>
                
                <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="name">
                        Name:{" "}
                    </label>
                    <input

                        className="border-2 hover:border-teal-500 rounded "
                        id="name"
                        type="text"
                        name="name"
                    />
                </div>
            </section>

        </div>
    );
};

export default Registration;