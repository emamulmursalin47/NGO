import { Link } from "react-router-dom";
export default function AssetCard({ data }) {
  const {
    type,
    productName,
    quantity,
    amount,
    depreciation,
    description,
    remarks,
    date,
  } = data;
  console.log(data);
  return (
    <div>
      <section>
        <section>
          <div className="max-w-5xl mx-auto bg-gray-100  border-b-2 py-4 ">
            <tr className="grid text-xs md:text-base grid-cols-4 md:grid-cols-4  items-center justify-center gap-1 text-center">
              <td>{productName}</td>
              <td>{quantity}</td>
              <td>{amount}</td>

              <td>
                <Link to={`/someLInks`}>
                  <button className="btn btn-xs md:btn-sm  btn-info text-white">
                    view
                  </button>
                </Link>
              </td>
            </tr>
          </div>
        </section>
      </section>
    </div>
  );
}
