const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="hidden md:block w-60 bg-white border-r border-gray-200 shadow-sm min-h-screen">
    <div className="p-6 space-y-2">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>

      {/* Dashboard Button */}
      <button
        onClick={() => setActiveTab('dashboard')}
        aria-current={activeTab === 'dashboard' ? 'page' : undefined}
        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === 'dashboard'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Dashboard Overview
      </button>

      {/* Report History Button */}
      <button
        onClick={() => setActiveTab('history')}
        aria-current={activeTab === 'history' ? 'page' : undefined}
        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === 'history'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Report History
      </button>
    </div>
  </aside>
);

export default Sidebar;
