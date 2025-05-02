import React from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { CustomAreaChart } from '@/components/ui/area-chart';
import { CustomLineChart } from '@/components/ui/line-chart';
import { DonutChart } from '@/components/ui/donut-chart';
import { LockKeyhole, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';

// Mock data for File Integrity Monitoring area chart
const fileIntegrityData = [
  { time: '18:30', modified: 420, added: 45, deleted: 120 },
  { time: '19:30', modified: 952, added: 23, deleted: 85 },
  { time: '20:30', modified: 1250, added: 12, deleted: 320 },
  { time: '21:30', modified: 870, added: 8, deleted: 90 },
  { time: '22:30', modified: 1500, added: 32, deleted: 110 },
  { time: '23:30', modified: 2100, added: 10, deleted: 180 },
  { time: '00:00', modified: 1800, added: 5, deleted: 60 },
];

// Mock data for Top 5 File Integrity agents
const fileAgentsData = [
  { name: 'falconery_011', value: 37 },
  { name: 'PC005_netteam2', value: 23 },
  { name: 'alex_004', value: 16 },
  { name: 'Mac0002', value: 14 },
  { name: 'Mini-062.local', value: 10 },
];

// Mock data for Alert Level Evolution
const alertLevelData = [
  { time: '18:30', keyEvents: 1500, highRisk: 3200, lowRisk: 2100 },
  { time: '19:30', keyEvents: 2500, highRisk: 3400, lowRisk: 2300 },
  { time: '20:30', keyEvents: 2000, highRisk: 3000, lowRisk: 2500 },
  { time: '21:30', keyEvents: 1700, highRisk: 2800, lowRisk: 2800 },
  { time: '22:30', keyEvents: 3200, highRisk: 3200, lowRisk: 2200 },
  { time: '23:30', keyEvents: 2800, highRisk: 3100, lowRisk: 2400 },
];

// Mock data for Threat Hunting agents
const threatAgentsData = [
  { name: 'PC005_poc5', value: 37 },
  { name: 'PC545_poc5', value: 23 },
  { name: 'PC589_poc5', value: 16 },
  { name: 'PC533_poc5', value: 14 },
  { name: 'PC519_poc5', value: 10 },
];

// Mock data for Alerts evolution
const alertsEvolutionData = [
  { time: '18:30', pc005: 2000, pc545: 3000, pc589: 1500, pc533: 1000, pc519: 1800 },
  { time: '19:00', pc005: 2200, pc545: 3200, pc589: 1600, pc533: 1100, pc519: 1900 },
  { time: '19:30', pc005: 2500, pc545: 3400, pc589: 1650, pc533: 1200, pc519: 2000 },
  { time: '20:00', pc005: 2800, pc545: 3600, pc589: 1700, pc533: 1250, pc519: 2100 },
  { time: '20:30', pc005: 3000, pc545: 3800, pc589: 1800, pc533: 1300, pc519: 2200 },
  { time: '21:00', pc005: 3200, pc545: 4000, pc589: 1850, pc533: 1350, pc519: 2250 },
  { time: '21:30', pc005: 3400, pc545: 4200, pc589: 1900, pc533: 1400, pc519: 2300 },
  { time: '22:00', pc005: 3600, pc545: 4400, pc589: 1950, pc533: 1450, pc519: 2350 },
  { time: '22:30', pc005: 3800, pc545: 4600, pc589: 2000, pc533: 1500, pc519: 2400 },
];

export default function HomePage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Security Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Actions" 
          value="1,234" 
          description="↑ 12% Raise" 
          icon={<LockKeyhole className="h-8 w-8" />} 
          className="bg-blue-500 text-white" 
          iconClassName="bg-blue-400"
        />
        
        <StatCard 
          title="Alerts" 
          value="87" 
          description="↓ 45 High-risk" 
          icon={<AlertTriangle className="h-8 w-8" />} 
          className="bg-red-500 text-white" 
          iconClassName="bg-red-400"
        />
        
        <StatCard 
          title="New risks" 
          value="24" 
          description="Last year" 
          icon={<TrendingUp className="h-8 w-8" />} 
          className="bg-yellow-500 text-white" 
          iconClassName="bg-yellow-400"
        />
        
        <StatCard 
          title="Vulnerabilities Fixed" 
          value="78%" 
          description="↑↑ 5% Last Month" 
          icon={<ShieldCheck className="h-8 w-8" />} 
          className="bg-green-500 text-white" 
          iconClassName="bg-green-400"
        />
      </div>

      {/* File Integrity Monitoring Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">File Integrity Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Alerts by action over time</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="bg-purple-300 rounded p-2 flex-1 text-center">
                  <p className="text-xs">Modified</p>
                  <p className="font-bold text-xl">9,669</p>
                </div>
                <div className="bg-green-200 rounded p-2 flex-1 text-center">
                  <p className="text-xs">Added</p>
                  <p className="font-bold text-xl">50</p>
                </div>
                <div className="bg-yellow-200 rounded p-2 flex-1 text-center">
                  <p className="text-xs">Deleted</p>
                  <p className="font-bold text-xl">723</p>
                </div>
              </div>
            </div>
            
            <CustomAreaChart
              title="File Changes Over Time"
              data={fileIntegrityData}
              areas={[
                { dataKey: 'modified', stroke: '#9333EA', fill: '#C084FC', name: 'Modified' },
                { dataKey: 'added', stroke: '#16A34A', fill: '#86EFAC', name: 'Added' },
                { dataKey: 'deleted', stroke: '#CA8A04', fill: '#FEF08A', name: 'Deleted' }
              ]}
              xAxisDataKey="time"
            />
          </div>

          <DonutChart 
            title="Top 5 agents"
            data={fileAgentsData}
            colors={['#15803D', '#22C55E', '#CA8A04', '#FACC15', '#FEF08A']}
          />
        </div>
      </div>

      {/* Threat Hunting Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Threat Hunting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h3 className="font-medium mb-4">Top 10 Alert level evolution</h3>
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-sm mb-1">Key events:</p>
                  <div className="bg-blue-100 h-4 rounded-full w-full"></div>
                </div>
                <div>
                  <p className="text-sm mb-1">High risk:</p>
                  <div className="bg-red-100 h-4 rounded-full w-1/4"></div>
                </div>
                <div>
                  <p className="text-sm mb-1">Low risk:</p>
                  <div className="bg-green-100 h-4 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            
            <CustomLineChart
              title="Alert Level Evolution"
              data={alertLevelData}
              lines={[
                { dataKey: 'keyEvents', stroke: '#3B82F6', name: 'Key Events' },
                { dataKey: 'highRisk', stroke: '#EF4444', name: 'High Risk' },
                { dataKey: 'lowRisk', stroke: '#22C55E', name: 'Low Risk' }
              ]}
              xAxisDataKey="time"
            />
          </div>

          <DonutChart 
            title="Top 5 agents"
            data={threatAgentsData}
            colors={['#3B82F6', '#60A5FA', '#93C5FD', '#FCA5A5', '#FEE2E2']}
          />
        </div>

        <CustomLineChart
          title="Alerts evolution - Top 5 agents"
          data={alertsEvolutionData}
          lines={[
            { dataKey: 'pc005', stroke: '#8B5CF6', name: 'PC005_poc5' },
            { dataKey: 'pc545', stroke: '#EC4899', name: 'PC545_poc5' },
            { dataKey: 'pc589', stroke: '#FBBF24', name: 'PC589_poc5' },
            { dataKey: 'pc533', stroke: '#14B8A6', name: 'PC533_poc5' },
            { dataKey: 'pc519', stroke: '#3B82F6', name: 'PC519_poc5' }
          ]}
          xAxisDataKey="time"
        />
      </div>
    </div>
  );
} 