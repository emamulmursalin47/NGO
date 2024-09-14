export const AssetRows = ({ data }) => (
  <>
    <tr className="bg-gray-100">
      <td colSpan="2" className="px-4 py-2 font-semibold">
        Current Assets:
      </td>
      <td colSpan="2"></td>
    </tr>
    {data.currentAssets.map((asset, index) => (
      <tr key={`current-asset-${index}`} className="hover:bg-gray-50">
        <td className="border px-4 py-2">{asset.name}</td>
        <td className="border px-4 py-2 text-right">
          {formatAmount(asset.amount)}
        </td>
        <td className="border"></td>
        <td className="border"></td>
      </tr>
    ))}
    <tr className="bg-gray-100">
      <td colSpan="2" className="px-4 py-2 font-semibold">
        Fixed Assets:
      </td>
      <td colSpan="2"></td>
    </tr>
    {data.fixedAssets.map((asset, index) => (
      <tr key={`fixed-asset-${index}`} className="hover:bg-gray-50">
        <td className="border px-4 py-2">{asset.name}</td>
        <td className="border px-4 py-2 text-right">
          {formatAmount(asset.amount)}
        </td>
        <td className="border"></td>
        <td className="border"></td>
      </tr>
    ))}
  </>
);

export const LiabilityRows = ({ data }) => (
  <>
    <tr className="bg-gray-100">
      <td colSpan="2"></td>
      <td colSpan="2" className="px-4 py-2 font-semibold">
        Current Liabilities:
      </td>
    </tr>
    {data.currentLiabilities.map((liability, index) => (
      <tr key={`liability-${index}`} className="hover:bg-gray-50">
        <td className="border"></td>
        <td className="border"></td>
        <td className="border px-4 py-2">{liability.name}</td>
        <td className="border px-4 py-2 text-right">
          {formatAmount(liability.amount)}
        </td>
      </tr>
    ))}
  </>
);

export const TotalRow = ({ assets, liabilities }) => (
  <tr className="bg-gray-200 font-bold">
    <td className="border px-4 py-2">TOTAL</td>
    <td className="border px-4 py-2 text-right">
      {formatAmount(assets.total)}
    </td>
    <td className="border px-4 py-2">TOTAL</td>
    <td className="border px-4 py-2 text-right">
      {formatAmount(liabilities.total)}
    </td>
  </tr>
);

const formatAmount = (amount) => {
  return (
    new Intl.NumberFormat("en-US", { style: "decimal" }).format(amount) + " TK"
  );
};
