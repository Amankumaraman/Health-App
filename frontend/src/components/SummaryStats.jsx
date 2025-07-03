const SummaryStats = ({ data, criticalCount }) => {
  const averageValue =
    data.length > 0
      ? data.reduce((sum, param) => sum + param.value, 0) / data.length
      : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Parameters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
        <h3 className="text-sm font-medium text-gray-500">Parameters</h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{data.length}</p>
      </div>

      {/* Critical Parameters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
        <h3 className="text-sm font-medium text-gray-500">Critical</h3>
        <p className="mt-2 text-2xl font-semibold text-red-600">{criticalCount}</p>
      </div>

      {/* Normal Parameters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
        <h3 className="text-sm font-medium text-gray-500">Normal</h3>
        <p className="mt-2 text-2xl font-semibold text-green-600">{data.length - criticalCount}</p>
      </div>

      {/* Average Value */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
        <h3 className="text-sm font-medium text-gray-500">Avg. Value</h3>
        <p className="mt-2 text-2xl font-semibold text-blue-600">{averageValue.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default SummaryStats;
