import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  MapPin, 
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ThreatEvent } from '@/types/security';
import { useToast } from '@/hooks/use-toast';

interface ThreatAlertProps {
  threat: ThreatEvent;
}

export const ThreatAlert = ({ threat }: ThreatAlertProps) => {
  const { toast } = useToast();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-threat-critical" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'low':
        return <Shield className="w-4 h-4 text-success" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'threat-critical';
      case 'high':
        return 'threat-high';
      case 'medium':
        return 'threat-medium';
      case 'low':
        return 'threat-low';
      default:
        return 'threat-low';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'mitigated':
        return <Badge variant="secondary">Mitigated</Badge>;
      case 'investigating':
        return <Badge variant="outline">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleInvestigate = () => {
    toast({
      title: "Investigation Started",
      description: `Starting detailed analysis of threat: ${threat.title}`,
    });
  };

  const handleMitigate = () => {
    toast({
      title: "Mitigation Initiated",
      description: `Auto-mitigation protocols activated for threat: ${threat.title}`,
    });
  };

  return (
    <Card className={`p-4 border ${getSeverityClass(threat.severity)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-0.5">
            {getSeverityIcon(threat.severity)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm truncate">{threat.title}</h4>
              {getStatusBadge(threat.status)}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {threat.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{threat.timestamp.toLocaleTimeString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="font-medium">Source:</span>
                <span className="truncate">{threat.source}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="font-medium">Target:</span>
                <span className="truncate">{threat.target}</span>
              </div>
              
              {threat.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{threat.location.country}</span>
                </div>
              )}
            </div>

            {threat.actionTaken && (
              <div className="mt-2 p-2 bg-muted rounded text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span className="font-medium">Action Taken:</span>
                </div>
                <p>{threat.actionTaken}</p>
              </div>
            )}
          </div>
        </div>

        {threat.status === 'active' && (
          <div className="flex gap-2 ml-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleInvestigate}
              className="text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              Investigate
            </Button>
            <Button 
              size="sm" 
              onClick={handleMitigate}
              className="text-xs"
            >
              Mitigate
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};