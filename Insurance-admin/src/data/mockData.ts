import { PolicyApplication, Product, Policy, Customer, CustomerPolicy, CustomerActivity, Claim } from '../types';

export const mockApplications: PolicyApplication[] = [
  {
    id: 'POL-2024-1847',
    date: '2024-12-29',
    applicantName: 'Abebe Bikila',
    product: 'Motor Comprehensive',
    riskScore: 78,
    riskLevel: 'High',
    status: 'Pending',
    assignedTo: 'Dawit A.',
    vehicleAge: 22,
    coverageAmount: '500,000 ETB',
    flaggedReasons: ['Vehicle Age > 20 years', 'Previous claim history']
  },
  {
    id: 'POL-2024-1848',
    date: '2024-12-29',
    applicantName: 'Sara Tadesse',
    product: 'Health Insurance Plus',
    riskScore: 45,
    riskLevel: 'Medium',
    status: 'Under Review',
    assignedTo: 'Dawit A.',
    coverageAmount: '1,000,000 ETB',
    flaggedReasons: ['Pre-existing condition noted']
  },
  {
    id: 'POL-2024-1846',
    date: '2024-12-28',
    applicantName: 'Yohannes Mekonnen',
    product: 'Property & Fire',
    riskScore: 32,
    riskLevel: 'Low',
    status: 'Approved',
    assignedTo: 'Meron K.',
    coverageAmount: '2,500,000 ETB'
  },
  {
    id: 'POL-2024-1845',
    date: '2024-12-28',
    applicantName: 'Tigist Alemayehu',
    product: 'Motor Third Party',
    riskScore: 58,
    riskLevel: 'Medium',
    status: 'Pending',
    assignedTo: 'Dawit A.',
    vehicleAge: 8,
    coverageAmount: '150,000 ETB'
  },
  {
    id: 'POL-2024-1844',
    date: '2024-12-27',
    applicantName: 'Kebede Worku',
    product: 'Business Liability',
    riskScore: 89,
    riskLevel: 'Critical',
    status: 'Under Review',
    assignedTo: 'Dawit A.',
    coverageAmount: '5,000,000 ETB',
    flaggedReasons: ['High-risk industry sector', 'Large coverage amount', 'Limited operating history']
  }
];

export const auditTimeline = [
  {
    timestamp: '10:00 AM',
    action: 'Application submitted via online portal',
    actor: 'System'
  },
  {
    timestamp: '10:02 AM',
    action: 'Automated risk assessment completed',
    actor: 'Risk Engine'
  },
  {
    timestamp: '10:05 AM',
    action: 'Flagged for manual review - High risk score',
    actor: 'System'
  },
  {
    timestamp: '10:30 AM',
    action: 'Assigned to underwriter queue',
    actor: 'Auto-Assignment'
  },
  {
    timestamp: '11:15 AM',
    action: 'Case opened for review',
    actor: 'Dawit A.'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'MTR-001',
    name: 'Motor Comprehensive',
    code: 'MTR-001',
    icon: 'Car',
    status: 'Live',
    description: 'Full coverage for private vehicles including theft and fire.',
    activePolicies: 1240,
    riskRules: 12
  },
  {
    id: 'HLT-001',
    name: 'Health Star Plus',
    code: 'HLT-001',
    icon: 'Heart',
    status: 'Live',
    description: 'Comprehensive health insurance with premium hospital coverage.',
    activePolicies: 850,
    riskRules: 8
  },
  {
    id: 'SME-001',
    name: 'SME Fire & Property',
    code: 'SME-001',
    icon: 'Home',
    status: 'Draft',
    description: 'Commercial property protection for small and medium enterprises.',
    activePolicies: 0,
    riskRules: 6
  },
  {
    id: 'TRV-001',
    name: 'Travel Secure',
    code: 'TRV-001',
    icon: 'Plane',
    status: 'Archived',
    description: 'International travel insurance with medical and trip coverage.',
    activePolicies: 320,
    riskRules: 5
  }
];

export const mockPolicies: Policy[] = [
  {
    id: 'POL-2024-998',
    policyNumber: 'POL-2024-998',
    customer: 'Alemayehu Tesfaye',
    product: 'Motor Comprehensive',
    effectiveDate: 'Jan 1, 2025',
    expiryDate: 'Jan 1, 2026',
    premium: 'ETB 12,500',
    status: 'Active'
  },
  {
    id: 'POL-2024-987',
    policyNumber: 'POL-2024-987',
    customer: 'Mahlet Bekele',
    product: 'Health Star Plus',
    effectiveDate: 'Dec 15, 2024',
    expiryDate: 'Dec 15, 2025',
    premium: 'ETB 8,750',
    status: 'Active'
  },
  {
    id: 'POL-2024-976',
    policyNumber: 'POL-2024-976',
    customer: 'Getachew Mengistu',
    product: 'Motor Comprehensive',
    effectiveDate: 'Nov 20, 2024',
    expiryDate: 'Nov 20, 2025',
    premium: 'ETB 15,200',
    status: 'Active'
  },
  {
    id: 'POL-2024-965',
    policyNumber: 'POL-2024-965',
    customer: 'Hiwot Desta',
    product: 'Travel Secure',
    effectiveDate: 'Oct 10, 2024',
    expiryDate: 'Oct 10, 2025',
    premium: 'ETB 3,400',
    status: 'Expired'
  },
  {
    id: 'POL-2024-954',
    policyNumber: 'POL-2024-954',
    customer: 'Dawit Assefa',
    product: 'Motor Comprehensive',
    effectiveDate: 'Sep 5, 2024',
    expiryDate: 'Sep 5, 2025',
    premium: 'ETB 11,800',
    status: 'Active'
  },
  {
    id: 'POL-2024-943',
    policyNumber: 'POL-2024-943',
    customer: 'Mulu Haile',
    product: 'Health Star Plus',
    effectiveDate: 'Aug 15, 2024',
    expiryDate: 'Aug 15, 2025',
    premium: 'ETB 9,200',
    status: 'Active'
  },
  {
    id: 'POL-2024-932',
    policyNumber: 'POL-2024-932',
    customer: 'Solomon Yilma',
    product: 'Motor Comprehensive',
    effectiveDate: 'Jul 1, 2024',
    expiryDate: 'Jul 1, 2025',
    premium: 'ETB 13,600',
    status: 'Active'
  },
  {
    id: 'POL-2024-921',
    policyNumber: 'POL-2024-921',
    customer: 'Tigist Wolde',
    product: 'Health Star Plus',
    effectiveDate: 'Jun 10, 2024',
    expiryDate: 'Jun 10, 2025',
    premium: 'ETB 7,950',
    status: 'Cancelled'
  },
  {
    id: 'POL-2024-910',
    policyNumber: 'POL-2024-910',
    customer: 'Yohannes Kebede',
    product: 'Motor Comprehensive',
    effectiveDate: 'May 22, 2024',
    expiryDate: 'May 22, 2025',
    premium: 'ETB 14,300',
    status: 'Active'
  },
  {
    id: 'POL-2024-899',
    policyNumber: 'POL-2024-899',
    customer: 'Selamawit Girma',
    product: 'Travel Secure',
    effectiveDate: 'Apr 5, 2024',
    expiryDate: 'Apr 5, 2025',
    premium: 'ETB 4,100',
    status: 'Expired'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Tigist Alemayehu',
    email: 'tigist.alemayehu@email.com',
    phone: '+251 911 234 567',
    region: 'Addis Ababa, Bole',
    activePolicies: 2,
    lifetimeValue: 'ETB 45,000',
    status: 'Active',
    segment: 'VIP',
    kycVerified: true,
    tags: ['Motor', 'Low Risk', 'Long Term'],
    joinDate: 'Jan 2022',
    totalPremiumPaid: 'ETB 45,000',
    claimRatio: '0%',
    tenure: '3 Years'
  },
  {
    id: 'CUST-002',
    name: 'Robel Assefa',
    email: 'robel.assefa@email.com',
    phone: '+251 911 345 678',
    region: 'Addis Ababa, Kirkos',
    activePolicies: 3,
    lifetimeValue: 'ETB 68,500',
    status: 'Active',
    segment: 'VIP',
    kycVerified: true,
    tags: ['Motor', 'Health', 'VIP'],
    joinDate: 'Mar 2021',
    totalPremiumPaid: 'ETB 68,500',
    claimRatio: '5%',
    tenure: '4 Years'
  },
  {
    id: 'CUST-003',
    name: 'Sara Mengistu',
    email: 'sara.mengistu@email.com',
    phone: '+251 911 456 789',
    region: 'Addis Ababa, Arada',
    activePolicies: 1,
    lifetimeValue: 'ETB 18,200',
    status: 'Active',
    segment: 'Standard',
    kycVerified: true,
    tags: ['Health', 'New Customer'],
    joinDate: 'Sep 2023',
    totalPremiumPaid: 'ETB 18,200',
    claimRatio: '0%',
    tenure: '1 Year'
  },
  {
    id: 'CUST-004',
    name: 'Dawit Tessema',
    email: 'dawit.tessema@email.com',
    phone: '+251 911 567 890',
    region: 'Dire Dawa',
    activePolicies: 2,
    lifetimeValue: 'ETB 32,400',
    status: 'Active',
    segment: 'Standard',
    kycVerified: true,
    tags: ['Motor', 'Property'],
    joinDate: 'Jun 2022',
    totalPremiumPaid: 'ETB 32,400',
    claimRatio: '2%',
    tenure: '2 Years'
  },
  {
    id: 'CUST-005',
    name: 'Hanna Bekele',
    email: 'hanna.bekele@email.com',
    phone: '+251 911 678 901',
    region: 'Bahir Dar',
    activePolicies: 1,
    lifetimeValue: 'ETB 12,800',
    status: 'Active',
    segment: 'Standard',
    kycVerified: false,
    tags: ['Motor'],
    joinDate: 'Nov 2023',
    totalPremiumPaid: 'ETB 12,800',
    claimRatio: '0%',
    tenure: '1 Year'
  },
  {
    id: 'CUST-006',
    name: 'Yonas Haile',
    email: 'yonas.haile@email.com',
    phone: '+251 911 789 012',
    region: 'Addis Ababa, Yeka',
    activePolicies: 4,
    lifetimeValue: 'ETB 95,600',
    status: 'Active',
    segment: 'VIP',
    kycVerified: true,
    tags: ['Motor', 'Health', 'Property', 'VIP'],
    joinDate: 'Jan 2020',
    totalPremiumPaid: 'ETB 95,600',
    claimRatio: '3%',
    tenure: '5 Years'
  },
  {
    id: 'CUST-007',
    name: 'Meron Kebede',
    email: 'meron.kebede@email.com',
    phone: '+251 911 890 123',
    region: 'Hawassa',
    activePolicies: 0,
    lifetimeValue: 'ETB 8,400',
    status: 'Inactive',
    segment: 'Standard',
    kycVerified: true,
    tags: ['Lapsed'],
    joinDate: 'May 2023',
    totalPremiumPaid: 'ETB 8,400',
    claimRatio: '0%',
    tenure: '1 Year'
  },
  {
    id: 'CUST-008',
    name: 'Elias Tesfaye',
    email: 'elias.tesfaye@email.com',
    phone: '+251 911 901 234',
    region: 'Addis Ababa, Kolfe',
    activePolicies: 2,
    lifetimeValue: 'ETB 28,900',
    status: 'Active',
    segment: 'Standard',
    kycVerified: true,
    tags: ['Motor', 'Travel'],
    joinDate: 'Feb 2023',
    totalPremiumPaid: 'ETB 28,900',
    claimRatio: '0%',
    tenure: '2 Years'
  },
  {
    id: 'CUST-009',
    name: 'Bethlehem Girma',
    email: 'bethlehem.girma@email.com',
    phone: '+251 911 012 345',
    region: 'Mekelle',
    activePolicies: 1,
    lifetimeValue: 'ETB 15,600',
    status: 'Active',
    segment: 'Standard',
    kycVerified: true,
    tags: ['Health'],
    joinDate: 'Aug 2023',
    totalPremiumPaid: 'ETB 15,600',
    claimRatio: '0%',
    tenure: '1 Year'
  },
  {
    id: 'CUST-010',
    name: 'Samuel Desta',
    email: 'samuel.desta@email.com',
    phone: '+251 911 123 456',
    region: 'Addis Ababa, Lideta',
    activePolicies: 3,
    lifetimeValue: 'ETB 52,300',
    status: 'Active',
    segment: 'VIP',
    kycVerified: true,
    tags: ['Motor', 'Health', 'VIP'],
    joinDate: 'Apr 2021',
    totalPremiumPaid: 'ETB 52,300',
    claimRatio: '1%',
    tenure: '3 Years'
  }
];

export const customerPoliciesMap: Record<string, CustomerPolicy[]> = {
  'CUST-001': [
    {
      id: 'POL-001',
      product: 'Motor Comprehensive',
      policyNumber: 'POL-2024-998',
      expiryDate: 'Jan 1, 2026',
      premium: 'ETB 12,500',
      status: 'Active'
    },
    {
      id: 'POL-002',
      product: 'Health Star Plus',
      policyNumber: 'POL-2023-456',
      expiryDate: 'Mar 15, 2025',
      premium: 'ETB 8,750',
      status: 'Active'
    }
  ],
  'CUST-002': [
    {
      id: 'POL-003',
      product: 'Motor Comprehensive',
      policyNumber: 'POL-2024-789',
      expiryDate: 'Feb 20, 2026',
      premium: 'ETB 15,200',
      status: 'Active'
    },
    {
      id: 'POL-004',
      product: 'Health Star Plus',
      policyNumber: 'POL-2024-790',
      expiryDate: 'Feb 20, 2026',
      premium: 'ETB 9,500',
      status: 'Active'
    },
    {
      id: 'POL-005',
      product: 'SME Fire & Property',
      policyNumber: 'POL-2024-791',
      expiryDate: 'Jun 1, 2025',
      premium: 'ETB 18,000',
      status: 'Active'
    }
  ]
};

export const customerActivitiesMap: Record<string, CustomerActivity[]> = {
  'CUST-001': [
    {
      id: 'ACT-001',
      action: 'Renewed Motor Policy',
      date: '2 days ago'
    },
    {
      id: 'ACT-002',
      action: 'Updated Address',
      date: '1 month ago'
    },
    {
      id: 'ACT-003',
      action: 'Submitted KYC Documents',
      date: '3 months ago'
    },
    {
      id: 'ACT-004',
      action: 'Joined as Customer',
      date: 'Jan 2022'
    }
  ],
  'CUST-002': [
    {
      id: 'ACT-005',
      action: 'Added Property Insurance',
      date: '1 week ago'
    },
    {
      id: 'ACT-006',
      action: 'Filed Claim for Motor',
      date: '3 months ago'
    },
    {
      id: 'ACT-007',
      action: 'Renewed Health Policy',
      date: '6 months ago'
    },
    {
      id: 'ACT-008',
      action: 'Joined as Customer',
      date: 'Mar 2021'
    }
  ]
};

export const mockClaims: Claim[] = [
  {
    id: 'CLM-2024-001',
    policyNumber: 'POL-2024-998',
    customerName: 'Alemayehu Tesfaye',
    product: 'Motor Comprehensive',
    claimType: 'Accident Damage',
    claimAmount: 'ETB 85,000',
    status: 'Under Review',
    submittedDate: 'Dec 28, 2024',
    assignedTo: 'Sara T.'
  },
  {
    id: 'CLM-2024-002',
    policyNumber: 'POL-2024-987',
    customerName: 'Mahlet Bekele',
    product: 'Health Star Plus',
    claimType: 'Medical Treatment',
    claimAmount: 'ETB 42,500',
    status: 'Approved',
    submittedDate: 'Dec 27, 2024',
    assignedTo: 'Meron K.'
  },
  {
    id: 'CLM-2024-003',
    policyNumber: 'POL-2024-976',
    customerName: 'Getachew Mengistu',
    product: 'Motor Comprehensive',
    claimType: 'Theft',
    claimAmount: 'ETB 320,000',
    status: 'Submitted',
    submittedDate: 'Dec 29, 2024',
    assignedTo: 'Dawit A.'
  },
  {
    id: 'CLM-2024-004',
    policyNumber: 'POL-2024-965',
    customerName: 'Tigist Wolde',
    product: 'Health Star Plus',
    claimType: 'Surgery',
    claimAmount: 'ETB 125,000',
    status: 'Paid',
    submittedDate: 'Dec 20, 2024',
    assignedTo: 'Sara T.'
  },
  {
    id: 'CLM-2024-005',
    policyNumber: 'POL-2024-932',
    customerName: 'Solomon Yilma',
    product: 'Motor Comprehensive',
    claimType: 'Fire Damage',
    claimAmount: 'ETB 450,000',
    status: 'Rejected',
    submittedDate: 'Dec 15, 2024',
    assignedTo: 'Meron K.'
  }
];
