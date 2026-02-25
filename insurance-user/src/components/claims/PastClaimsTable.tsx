interface PastClaim {
  date: string;
  claimId: string;
  type: string;
  amount: string;
  status: 'paid' | 'declined';
}

interface PastClaimsTableProps {
  claims: PastClaim[];
}

export default function PastClaimsTable({ claims }: PastClaimsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Claim ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.map((claim, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{claim.date}</td>
                <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">
                  {claim.claimId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{claim.type}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{claim.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      claim.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {claim.status === 'paid' ? 'Paid' : 'Declined'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
