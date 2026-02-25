export interface PolicyApplication {
  id: string;
  date: string;
  applicantName: string;
  product: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Under Review' | 'Approved' | 'Declined' | 'Info Requested';
  assignedTo: string;
  vehicleAge?: number;
  coverageAmount?: string;
  flaggedReasons?: string[];
}

export interface SummaryMetric {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
}

export interface AuditEvent {
  timestamp: string;
  action: string;
  actor: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  icon: string;
  status: 'Live' | 'Draft' | 'Archived';
  description: string;
  activePolicies: number;
  riskRules: number;
  formFields?: FormField[];
  coverageConfig?: {
    minCoverage: number;
    maxCoverage: number;
    defaultDeductible: number;
    premiumRate: number;
  };
}

export interface Policy {
  id: string;
  policyNumber: string;
  customer: string;
  product: string;
  effectiveDate: string;
  expiryDate: string;
  premium: string;
  status: 'Active' | 'Expired' | 'Cancelled';
}

export interface FormField {
  id: string;
  label: string;
  dataType: 'Text' | 'Number' | 'Date' | 'Select' | 'File Upload';
  required: boolean;
  options?: string[];
  validationRules?: {
    pattern?: string;
    patternMessage?: string;
    min?: number;
    max?: number;
  };
  conditionalLogic?: {
    enabled: boolean;
    triggerFieldId: string;
    operator: '=' | '!=' | '>' | '<';
    value: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  activePolicies: number;
  lifetimeValue: string;
  status: 'Active' | 'Inactive';
  segment: 'VIP' | 'Standard';
  kycVerified: boolean;
  tags: string[];
  joinDate: string;
  totalPremiumPaid: string;
  claimRatio: string;
  tenure: string;
}

export interface CustomerPolicy {
  id: string;
  product: string;
  policyNumber: string;
  expiryDate: string;
  premium: string;
  status: 'Active' | 'Expired';
}

export interface CustomerActivity {
  id: string;
  action: string;
  date: string;
}

export interface Claim {
  id: string;
  policyNumber: string;
  customerName: string;
  product: string;
  claimType: string;
  claimAmount: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Paid';
  submittedDate: string;
  assignedTo: string;
}
