import { ThreatEvent, SecurityMetrics, SystemStatus, AutomationRule } from '@/types/security';

export const mockThreats: ThreatEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    category: 'malware',
    severity: 'high',
    status: 'active',
    title: 'Ransomware Detection',
    description: 'Suspicious file encryption activity detected in Documents folder',
    source: '192.168.1.100',
    target: 'DESKTOP-USER01',
    location: {
      ip: '45.76.123.45',
      country: 'Russia',
      city: 'Moscow'
    },
    metadata: {
      fileHash: 'a1b2c3d4e5f6',
      processId: 4521,
      userId: 'user01'
    }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    category: 'brute_force',
    severity: 'medium',
    status: 'mitigated',
    title: 'Multiple Failed Login Attempts',
    description: '15 failed SSH login attempts from external IP',
    source: '203.45.67.89',
    target: 'server.company.com',
    actionTaken: 'IP address blocked for 24 hours',
    location: {
      ip: '203.45.67.89',
      country: 'China',
      city: 'Beijing'
    },
    metadata: {
      port: 22,
      protocol: 'SSH'
    }
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    category: 'phishing',
    severity: 'medium',
    status: 'investigating',
    title: 'Suspicious Email Activity',
    description: 'Email with suspicious attachment sent to multiple users',
    source: 'attacker@suspicious-domain.com',
    target: 'Multiple users',
    metadata: {
      fileHash: 'x7y8z9a1b2c3'
    }
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    category: 'data_exfiltration',
    severity: 'high',
    status: 'resolved',
    title: 'Unusual Data Transfer',
    description: 'Large file transfer to external cloud service detected',
    source: 'LAPTOP-FINANCE02',
    target: 'unknown-cloud-service.com',
    actionTaken: 'Transfer blocked, files quarantined',
    mitigation: 'Network access restricted for affected device'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
    category: 'network_intrusion',
    severity: 'low',
    status: 'resolved',
    title: 'Port Scan Detected',
    description: 'External scanner probing network ports',
    source: '156.78.90.123',
    target: 'Network perimeter',
    actionTaken: 'Firewall rule updated',
    location: {
      ip: '156.78.90.123',
      country: 'United States',
      city: 'New York'
    }
  }
];

export const mockMetrics: SecurityMetrics = {
  threatsDetected: 247,
  threatsMitigated: 234,
  threatsBlocked: 89,
  systemsProtected: 156,
  riskScore: 15, // Out of 100, lower is better
  lastScan: new Date(Date.now() - 600000)
};

export const mockSystemStatus: SystemStatus = {
  overall: 'warning',
  firewall: true,
  antivirus: true,
  realTimeProtection: true,
  lastUpdate: new Date(Date.now() - 3600000), // 1 hour ago
  connectedDevices: 156
};

export const mockAutomationRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'High Threat Auto-Isolation',
    description: 'Automatically isolate systems when high or critical threats are detected',
    enabled: true,
    triggers: {
      severity: ['high', 'critical'],
      categories: ['malware', 'data_exfiltration']
    },
    actions: {
      isolate: true,
      notify: true,
      escalate: true
    }
  },
  {
    id: 'rule-2',
    name: 'Brute Force Protection',
    description: 'Block IPs after multiple failed login attempts',
    enabled: true,
    triggers: {
      severity: ['medium', 'high'],
      categories: ['brute_force']
    },
    actions: {
      blockIp: true,
      notify: true
    }
  },
  {
    id: 'rule-3',
    name: 'Malicious File Quarantine',
    description: 'Quarantine detected malicious files',
    enabled: true,
    triggers: {
      severity: ['medium', 'high', 'critical'],
      categories: ['malware', 'malicious_file']
    },
    actions: {
      quarantine: true,
      notify: true
    }
  }
];

// Function to generate realistic threat data
export const generateThreatData = (): ThreatEvent => {
  const categories = ['malware', 'phishing', 'network_intrusion', 'brute_force', 'suspicious_behavior'];
  const severities = ['low', 'medium', 'high'];
  const statuses = ['active', 'investigating', 'mitigated'];
  
  const category = categories[Math.floor(Math.random() * categories.length)] as any;
  const severity = severities[Math.floor(Math.random() * severities.length)] as any;
  const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
  
  const threats = {
    malware: [
      'Trojan detected in system files',
      'Suspicious executable found',
      'Virus signature match'
    ],
    phishing: [
      'Suspicious email link clicked',
      'Fake login page detected',
      'Social engineering attempt'
    ],
    network_intrusion: [
      'Unauthorized access attempt',
      'Port scanning activity',
      'Suspicious network traffic'
    ],
    brute_force: [
      'Multiple login failures',
      'Password attack detected',
      'Account lockout triggered'
    ],
    suspicious_behavior: [
      'Unusual file access pattern',
      'Abnormal network activity',
      'Process behavior anomaly'
    ]
  };
  
  const ips = ['192.168.1.', '10.0.0.', '172.16.0.'];
  const sourceIp = ips[Math.floor(Math.random() * ips.length)] + Math.floor(Math.random() * 255);
  
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    category,
    severity,
    status,
    title: threats[category][Math.floor(Math.random() * threats[category].length)],
    description: `Automated threat detection system flagged this ${category} activity`,
    source: sourceIp,
    target: 'System-' + Math.floor(Math.random() * 100),
    metadata: {
      processId: Math.floor(Math.random() * 9999),
      port: Math.floor(Math.random() * 65535)
    }
  };
};