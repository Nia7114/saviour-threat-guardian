import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ThreatEvent } from '@/types/security';

interface ThreatChartProps {
  threats: ThreatEvent[];
}

export const ThreatChart = ({ threats }: ThreatChartProps) => {
  const chartData = useMemo(() => {
    // Group threats by hour for the last 24 hours
    const now = new Date();
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      return {
        hour: hour.getHours(),
        label: hour.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
        threats: 0,
        high: 0,
        medium: 0,
        low: 0
      };
    });

    threats.forEach(threat => {
      const threatHour = threat.timestamp.getHours();
      const dataPoint = hours.find(h => h.hour === threatHour);
      if (dataPoint) {
        dataPoint.threats++;
        if (threat.severity === 'high' || threat.severity === 'critical') {
          dataPoint.high++;
        } else if (threat.severity === 'medium') {
          dataPoint.medium++;
        } else {
          dataPoint.low++;
        }
      }
    });

    return hours;
  }, [threats]);

  const severityData = useMemo(() => {
    const counts = threats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Low', value: counts.low || 0, color: 'hsl(var(--threat-low))' },
      { name: 'Medium', value: counts.medium || 0, color: 'hsl(var(--threat-medium))' },
      { name: 'High', value: counts.high || 0, color: 'hsl(var(--threat-high))' },
      { name: 'Critical', value: counts.critical || 0, color: 'hsl(var(--threat-critical))' }
    ].filter(item => item.value > 0);
  }, [threats]);

  return (
    <div className="space-y-6">
      {/* Threat Timeline */}
      <div>
        <h4 className="text-sm font-medium mb-3">Threat Activity (24h)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="label" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {severityData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1 text-xs">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Threats by Severity</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="label" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Bar dataKey="high" stackId="a" fill="hsl(var(--destructive))" />
              <Bar dataKey="medium" stackId="a" fill="hsl(var(--warning))" />
              <Bar dataKey="low" stackId="a" fill="hsl(var(--success))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};