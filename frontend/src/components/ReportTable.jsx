const ReportTable = ({ flagged_data = [] }) => {
  const isEmpty = !flagged_data || flagged_data.length === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[32rem] overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">📄 Full Refined Health Report</h2>

      {isEmpty ? (
        <div className="text-green-600 font-medium text-sm">
          ✅ All parameters are within the normal range.
        </div>
      ) : (
        <ul className="pl-5 space-y-3 text-sm text-gray-700">
          {flagged_data.map((item, idx) => (
            <li key={`param-${idx}`} className="list-disc ml-4">
              <strong>{item.parameter}</strong> ({item.value} {item.unit}) — {item.status}.
              {item.insight && (
                <span className="block text-gray-500 text-xs italic">
                  ⚠️ Insight: {item.insight}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportTable;
