import React, { useState } from 'react';
import { useAnalytics } from './hooks/useAnalytics.js';
import Header from './components/Dashboard/Header.jsx';
import Sidebar from './components/Dashboard/Sidebar.jsx';
import Loading from './components/UI/Loading.jsx';
import OverviewTab from './components/Tabs/OverviewTab.jsx';
import TrafficTab from './components/Tabs/TrafficTab.jsx';
import PerformanceTab from './components/Tabs/PerformanceTab.jsx';
import SeoTab from './components/Tabs/SeoTab.jsx';
import RealTimeTab from './components/Tabs/RealTimeTab.jsx';
import './styles.css';

function App() {
  const { data, loading, error } = useAnalytics();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={data} />;
      case 'traffic':
        return <TrafficTab data={data} />;
      case 'performance':
        return <PerformanceTab data={data} />;
      case 'seo':
        return <SeoTab data={data} />;
      case 'realtime':
        return <RealTimeTab data={data} />;
      default:
        return <OverviewTab data={data} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
      />
      
      <div className={`dashboard-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header 
          timeRange={timeRange} 
          onTimeRangeChange={setTimeRange}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Navigation removed as requested */}
        
        <main className="dashboard-content">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default App;