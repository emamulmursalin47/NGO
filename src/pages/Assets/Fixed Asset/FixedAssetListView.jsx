

const FixedAssetListView = () => {
    return (
        <div>
             <table className="w-full mt-8 ">
                <tr className="grid grid-cols-5 items-center justify-center gap-1 text-center">
                    <th>Member Name</th>
                    <th>Phone Number</th>
                    <th>Occupation</th>
                    <th>Present Address</th>
                </tr>
                <tr className="grid grid-cols-5 items-center w-full justify-between text-center">
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>

                    <td>
                        <button className="btn btn-info text-white">view</button>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default FixedAssetListView;