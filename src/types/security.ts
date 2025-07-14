export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ThreatCategory = 
  | 'malware'
  | 'phishing'
  | 'network_intrusion'
  | 'ddos'
  | 'insider_threat'
  | 'zero_day'
  | 'brute_force'
  | 'data_exfiltration'
  | 'suspicious_behavior'
  | 'invalid_ip'
  | 'malicious_file';

export type ThreatStatus = 'active' | 'mitigated' | 'investigating' | 'resolved';

export interface ThreatEvent {
  id: string;
  timestamp: Date;
  category: ThreatCategory;
  severity: ThreatSeverity;
  status: ThreatStatus;
  title: string;
  description: string;
  source: string;
  target: string;
  actionTaken?: string;
  mitigation?: string;
  location?: {
    ip: string;
    country: string;
    city: string;
  };
  metadata?: {
    fileHash?: string;
    processId?: number;
    userId?: string;
    port?: number;
    protocol?: string;
  };
}

export interface SecurityMetrics {
  threatsDetected: number;
  threatsMitigated: number;
  threatsBlocked: number;
  systemsProtected: number;
  riskScore: number;
  lastScan: Date;
}

export interface SystemStatus {
  overall: 'safe' | 'warning' | 'danger';
  firewall: boolean;
  antivirus: boolean;
  realTimeProtection: boolean;
  lastUpdate: Date;
  connectedDevices: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  triggers: {
    severity: ThreatSeverity[];
    categories: ThreatCategory[];
  };
  actions: {
    isolate?: boolean;
    blockIp?: boolean;
    quarantine?: boolean;
    notify?: boolean;
    escalate?: boolean;
  };
}

export interface IncidentReport {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  severity: ThreatSeverity;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  events: ThreatEvent[];
  timeline: {
    timestamp: Date;
    action: string;
    user: string;
  }[];
}