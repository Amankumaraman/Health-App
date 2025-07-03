import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ReportDashboard from './components/ReportDashboard';
import Header from './components/Header';
import Login from './components/Login';

export default function App() {
  const [reportResult, setReportResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setReportResult(null);
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header onLogout={handleLogout} />

      <main className="flex-grow overflow-hidden w-full px-4 sm:px-6 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          <div className="lg:col-span-8 space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            <FileUpload onExtract={setReportResult} />
            {reportResult ? (
              <ReportDashboard
                data={reportResult.data}
                aiSummary={reportResult.ai_summary}
                flagged_data={reportResult.flagged_data}
              />
            ) : (
              <div className="card text-center text-sm text-gray-500">
                🧾 Upload a health report to see insights.
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            <div className="card">
              <h2 className="section-title mb-2">📂 Recent Reports</h2>
              <p className="subtext">Your recent uploads will appear here.</p>
            </div>

            <div className="card">
              <h2 className="section-title mb-2">💡 Health Tips</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Drink at least 2L of water daily</li>
                <li>Get 7–8 hours of sleep</li>
                <li>Walk 30 minutes a day</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
