import React from 'react';
import SummaryStats from './SummaryStats';
import HealthTrends from './HealthTrends';
import ReportTable from './ReportTable';

const ReportDashboard = ({
  data = [],
  aiSummary = '',
  bullet_report = '',
  flagged_data = []
}) => {
  const criticalParams = data.filter(p => p.status === 'Needs Attention');
  const borderlineParams = data.filter(p =>
    p.status.toLowerCase().includes('borderline') || p.status.toLowerCase().includes('high')
  );
  const normalImportantParams = data
    .filter(p => p.status === 'Normal' && p.parameter && p.parameter.length > 2)
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 🧠 AI Health Summary */}
      {aiSummary && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">🧠</span>
            <h3 className="text-lg font-semibold">AI Health Insights</h3>
          </div>
          <p className="text-sm whitespace-pre-line leading-relaxed">{aiSummary}</p>
        </div>
      )}

      {/* 📊 Summary Stats */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-md font-semibold text-gray-800 mb-3">📊 Summary Stats</h3>
        <SummaryStats data={data} criticalCount={criticalParams.length} />
      </div>

      {/* 📈 Health Trends */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-md font-semibold text-gray-800 mb-3">📈 Health Trends</h3>
        <HealthTrends data={data} />
      </div>

      {/* 📄 Full Report */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-md font-semibold text-gray-800 mb-3">📄 Full Refined Health Report</h3>
        <ReportTable flagged_data={flagged_data} />
      </div>
    </div>
  );
};

export default ReportDashboard;
