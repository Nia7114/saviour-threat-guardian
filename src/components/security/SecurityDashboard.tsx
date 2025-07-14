import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Eye, 
  Lock, 
  Globe,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import { ThreatEvent, SecurityMetrics, SystemStatus } from '@/types/security';
import { mockThreats, mockMetrics, mockSystemStatus, generateThreatData } from '@/data/mockThreats';
import { ThreatAlert } from './ThreatAlert';
import { ThreatChart } from './ThreatChart';

export const SecurityDashboard = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>(mockThreats);
  const [metrics, setMetrics] = useState<SecurityMetrics>(mockMetrics);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(mockSystemStatus);
  const [isScanning, setIsScanning] = useState(false);

  // Simulate real-time threat detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const newThreat = generateThreatData();
        setThreats(prev => [newThreat, ...prev.slice(0, 19)]); // Keep only latest 20
        
        // Update metrics
        setMetrics(prev => ({
          ...prev,
          threatsDetected: prev.threatsDetected + 1,
          riskScore: Math.min(100, prev.riskScore + Math.random() * 5)
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setMetrics(prev => ({
        ...prev,
        lastScan: new Date()
      }));
    }, 3000);
  };

  const activeThreatCount = threats.filter(t => t.status === 'active').length;
  const highSeverityCount = threats.filter(t => t.severity === 'high' || t.severity === 'critical').length;

  const getStatusColor = (status: SystemStatus['overall']) => {
    switch (status) {
      case 'safe': return 'status-safe';
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg security-gradient flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Saviour Security</h1>
            <p className="text-muted-foreground">Real-time threat detection & response</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`status-indicator ${getStatusColor(systemStatus.overall)}`} />
            <span className="text-sm font-medium">System {systemStatus.overall.toUpperCase()}</span>
          </div>
          <Button 
            onClick={handleScan} 
            disabled={isScanning}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeThreatCount}</div>
            <p className="text-xs text-muted-foreground">
              {highSeverityCount} high severity
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.threatsDetected}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12 from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Mitigated</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{metrics.threatsMitigated}</div>
            <p className="text-xs text-muted-foreground">
              94.7% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.riskScore}/100</div>
            <Progress value={metrics.riskScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Recent Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {threats.slice(0, 5).map((threat) => (
                <ThreatAlert key={threat.id} threat={threat} />
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Threat Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ThreatChart threats={threats} />
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                System Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Firewall</span>
                <Badge variant={systemStatus.firewall ? "default" : "destructive"}>
                  {systemStatus.firewall ? "Active" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Antivirus</span>
                <Badge variant={systemStatus.antivirus ? "default" : "destructive"}>
                  {systemStatus.antivirus ? "Active" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Real-time Protection</span>
                <Badge variant={systemStatus.realTimeProtection ? "default" : "destructive"}>
                  {systemStatus.realTimeProtection ? "Active" : "Disabled"}
                </Badge>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span>Connected Devices</span>
                  <span className="font-medium">{systemStatus.connectedDevices}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>Last Update</span>
                  <span className="text-muted-foreground">
                    {systemStatus.lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Network Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Blocked IPs (24h)</span>
                  <span className="font-medium text-destructive">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quarantined Files</span>
                  <span className="font-medium text-warning">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Clean Scans</span>
                  <span className="font-medium text-success">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};