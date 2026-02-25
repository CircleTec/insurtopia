import { Product, ApplicationFormStep } from '../types';

export const products: Product[] = [
  {
    id: 'motor-comprehensive',
    name: 'Comprehensive Motor Insurance',
    shortDescription: 'Complete protection for your vehicle against accidents, theft, and damage',
    description: 'Our Comprehensive Motor Insurance provides extensive coverage for your vehicle, protecting you against accidents, theft, fire, and third-party liabilities. Get peace of mind on Ethiopian roads with our market-leading motor insurance.',
    icon: 'Car',
    category: 'auto',
    basePrice: 450,
    coverageAmount: 500000,
    benefits: [
      'Coverage for own damage due to accidents, fire, or theft',
      'Third-party liability coverage up to ETB 500,000',
      'Free roadside assistance and towing service',
      'Windscreen and glass damage coverage',
      'Replacement vehicle during repairs',
      'Coverage for natural disasters',
      'Personal accident cover for driver and passengers',
      '24/7 claims support'
    ],
    exclusions: [
      'Wear and tear of vehicle parts',
      'Driving under the influence of alcohol or drugs',
      'Unlicensed or unauthorized drivers',
      'Intentional damage or illegal activities',
      'Racing or competitive events',
      'Vehicles used for commercial purposes without disclosure'
    ],
    requirements: [
      'Valid vehicle registration documents',
      'Driver\'s license (minimum 2 years)',
      'Vehicle inspection certificate',
      'Previous insurance history (if applicable)',
      'Passport or National ID'
    ],
    features: [
      {
        icon: 'Shield',
        title: 'Full Protection',
        description: 'Comprehensive coverage for all types of damage'
      },
      {
        icon: 'Wrench',
        title: 'Free Repairs',
        description: 'Network of authorized repair centers'
      },
      {
        icon: 'Phone',
        title: '24/7 Support',
        description: 'Round-the-clock claims assistance'
      },
      {
        icon: 'Zap',
        title: 'Quick Claims',
        description: 'Fast claim processing within 48 hours'
      }
    ]
  },
  {
    id: 'health-family',
    name: 'Family Health Insurance',
    shortDescription: 'Comprehensive healthcare coverage for your entire family',
    description: 'Protect your family\'s health with our comprehensive family health insurance plan. Coverage includes hospitalization, outpatient care, dental, and emergency services at top Ethiopian medical facilities.',
    icon: 'Heart',
    category: 'health',
    basePrice: 850,
    coverageAmount: 1000000,
    benefits: [
      'Inpatient hospitalization coverage up to ETB 1,000,000 per year',
      'Outpatient consultation and treatment',
      'Emergency ambulance services',
      'Prescription medication coverage',
      'Dental and optical care',
      'Maternity and newborn care',
      'Preventive health check-ups',
      'Coverage for pre-existing conditions after waiting period',
      'Cashless treatment at network hospitals'
    ],
    exclusions: [
      'Cosmetic or aesthetic procedures',
      'Self-inflicted injuries',
      'Treatment for alcohol or drug abuse',
      'Experimental or unproven treatments',
      'War or civil unrest related injuries'
    ],
    requirements: [
      'Medical history questionnaire',
      'Age proof for all family members',
      'Passport or National ID for all members',
      'Recent medical examination results (for members over 60)'
    ],
    features: [
      {
        icon: 'Users',
        title: 'Family Coverage',
        description: 'Cover up to 6 family members'
      },
      {
        icon: 'Hospital',
        title: 'Top Hospitals',
        description: 'Access to 50+ network hospitals'
      },
      {
        icon: 'CreditCard',
        title: 'Cashless Claims',
        description: 'No upfront payment at network facilities'
      },
      {
        icon: 'Calendar',
        title: 'Annual Check-ups',
        description: 'Free preventive health screenings'
      }
    ]
  },
  {
    id: 'life-term',
    name: 'Term Life Insurance',
    shortDescription: 'Financial security for your loved ones',
    description: 'Ensure your family\'s financial future with our term life insurance. Provides a lump sum payment to your beneficiaries in case of your untimely demise, helping them maintain their lifestyle and meet financial obligations.',
    icon: 'HeartHandshake',
    category: 'life',
    basePrice: 300,
    coverageAmount: 2000000,
    benefits: [
      'Death benefit payout up to ETB 2,000,000',
      'Accidental death double benefit',
      'Terminal illness advance payment',
      'Flexible premium payment options',
      'Tax benefits on premiums paid',
      'Riders available: Critical illness, disability',
      'No medical exam required for coverage up to ETB 500,000',
      'Grace period for premium payments'
    ],
    exclusions: [
      'Death within first year due to pre-existing conditions',
      'Suicide within first two policy years',
      'Death due to criminal activities',
      'Death during participation in hazardous activities without disclosure',
      'War or nuclear incidents'
    ],
    requirements: [
      'Age between 18-65 years',
      'Medical questionnaire',
      'Income proof',
      'Beneficiary details',
      'Passport or National ID'
    ],
    features: [
      {
        icon: 'TrendingUp',
        title: 'Growing Coverage',
        description: 'Increase coverage as your needs grow'
      },
      {
        icon: 'DollarSign',
        title: 'Affordable Premiums',
        description: 'Low monthly payments starting at ETB 300'
      },
      {
        icon: 'FileText',
        title: 'Easy Claims',
        description: 'Simple documentation process'
      },
      {
        icon: 'Lock',
        title: 'Guaranteed Payout',
        description: 'No claim rejection for disclosed conditions'
      }
    ]
  },
  {
    id: 'home-property',
    name: 'Home & Property Insurance',
    shortDescription: 'Protect your home and belongings from unforeseen events',
    description: 'Comprehensive coverage for your home, including the building structure and contents. Protection against fire, theft, natural disasters, and liability for accidents on your property.',
    icon: 'Home',
    category: 'home',
    basePrice: 550,
    coverageAmount: 3000000,
    benefits: [
      'Building structure coverage up to ETB 3,000,000',
      'Contents and personal belongings coverage',
      'Protection against fire, earthquake, and floods',
      'Theft and burglary coverage',
      'Public liability coverage for injuries on property',
      'Temporary accommodation costs during repairs',
      'Garden and outdoor property coverage',
      'Alternative accommodation expenses'
    ],
    exclusions: [
      'Wear and tear or gradual deterioration',
      'Damage from lack of maintenance',
      'Vacant property (unoccupied for 60+ days)',
      'Intentional damage',
      'War, terrorism, or nuclear risks'
    ],
    requirements: [
      'Property ownership documents',
      'Property valuation certificate',
      'Security measures details',
      'Property photographs',
      'Passport or National ID'
    ],
    features: [
      {
        icon: 'Shield',
        title: 'Total Protection',
        description: 'Building and contents fully covered'
      },
      {
        icon: 'MapPin',
        title: 'Nationwide Coverage',
        description: 'Protection anywhere in Ethiopia'
      },
      {
        icon: 'Hammer',
        title: 'Repair Network',
        description: 'Trusted contractors for repairs'
      },
      {
        icon: 'Umbrella',
        title: 'Liability Cover',
        description: 'Protection against third-party claims'
      }
    ]
  },
  {
    id: 'travel-international',
    name: 'International Travel Insurance',
    shortDescription: 'Travel worry-free with comprehensive international coverage',
    description: 'Essential protection for your international trips including medical emergencies, trip cancellation, lost baggage, and more. Accepted by embassies for visa applications.',
    icon: 'Plane',
    category: 'travel',
    basePrice: 120,
    coverageAmount: 50000,
    benefits: [
      'Medical emergency coverage up to USD 50,000',
      'Trip cancellation and interruption coverage',
      'Lost, stolen, or delayed baggage compensation',
      'Emergency medical evacuation',
      'Repatriation of remains',
      '24/7 emergency assistance hotline',
      'Passport loss assistance',
      'Flight delay and missed connection compensation'
    ],
    exclusions: [
      'Pre-existing medical conditions without disclosure',
      'High-risk activities without additional coverage',
      'Travel to countries with travel advisories',
      'Pandemic-related claims (check specific terms)',
      'Losses due to intoxication'
    ],
    requirements: [
      'Valid passport',
      'Travel itinerary and flight tickets',
      'Destination country details',
      'Trip duration',
      'Medical questionnaire'
    ],
    features: [
      {
        icon: 'Globe',
        title: 'Global Coverage',
        description: 'Protection in 150+ countries'
      },
      {
        icon: 'Clock',
        title: 'Instant Policy',
        description: 'Get covered in minutes'
      },
      {
        icon: 'Briefcase',
        title: 'Visa Support',
        description: 'Embassy-approved documentation'
      },
      {
        icon: 'Phone',
        title: 'Emergency Assist',
        description: 'Multilingual support team'
      }
    ]
  }
];

export const applicationForms: Record<string, ApplicationFormStep[]> = {
  'motor-comprehensive': [
    {
      id: 'kyc',
      title: 'Personal Information',
      description: 'Help us verify your identity',
      fields: [
        {
          id: 'fullName',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full legal name',
          required: true
        },
        {
          id: 'dateOfBirth',
          type: 'date',
          label: 'Date of Birth',
          required: true
        },
        {
          id: 'idType',
          type: 'select',
          label: 'ID Type',
          required: true,
          options: [
            { value: 'passport', label: 'Passport' },
            { value: 'national_id', label: 'National ID' },
            { value: 'drivers_license', label: 'Driver\'s License' }
          ]
        },
        {
          id: 'idNumber',
          type: 'text',
          label: 'ID Number',
          placeholder: 'Enter your ID number',
          required: true
        },
        {
          id: 'idDocument',
          type: 'file',
          label: 'Upload ID Document',
          required: true
        },
        {
          id: 'phoneNumber',
          type: 'text',
          label: 'Phone Number',
          placeholder: '+251 912 345 678',
          required: true
        },
        {
          id: 'email',
          type: 'text',
          label: 'Email Address',
          placeholder: 'your.email@example.com',
          required: true
        },
        {
          id: 'address',
          type: 'textarea',
          label: 'Residential Address',
          placeholder: 'Enter your complete address',
          required: true
        }
      ]
    },
    {
      id: 'vehicle-details',
      title: 'Vehicle Information',
      description: 'Tell us about your vehicle',
      fields: [
        {
          id: 'vehicleMake',
          type: 'text',
          label: 'Vehicle Make',
          placeholder: 'e.g., Toyota',
          required: true
        },
        {
          id: 'vehicleModel',
          type: 'text',
          label: 'Vehicle Model',
          placeholder: 'e.g., Corolla',
          required: true
        },
        {
          id: 'vehicleYear',
          type: 'number',
          label: 'Year of Manufacture',
          placeholder: '2020',
          required: true,
          validation: {
            min: 1990,
            max: 2025,
            message: 'Please enter a valid year between 1990 and 2025'
          }
        },
        {
          id: 'plateNumber',
          type: 'text',
          label: 'Plate Number',
          placeholder: 'AA-12345',
          required: true
        },
        {
          id: 'chassisNumber',
          type: 'text',
          label: 'Chassis Number (VIN)',
          placeholder: 'Enter 17-character VIN',
          required: true
        },
        {
          id: 'vehicleValue',
          type: 'number',
          label: 'Current Vehicle Value (ETB)',
          placeholder: '500000',
          required: true
        },
        {
          id: 'vehicleUsage',
          type: 'select',
          label: 'Primary Usage',
          required: true,
          options: [
            { value: 'personal', label: 'Personal Use' },
            { value: 'business', label: 'Business Use' },
            { value: 'commercial', label: 'Commercial/Taxi' }
          ]
        }
      ]
    },
    {
      id: 'driver-history',
      title: 'Driver Information',
      description: 'Your driving history helps us provide accurate quotes',
      fields: [
        {
          id: 'licenseNumber',
          type: 'text',
          label: 'Driver\'s License Number',
          required: true
        },
        {
          id: 'licenseIssueDate',
          type: 'date',
          label: 'License Issue Date',
          required: true
        },
        {
          id: 'yearsOfExperience',
          type: 'number',
          label: 'Years of Driving Experience',
          required: true,
          validation: {
            min: 0,
            max: 60
          }
        },
        {
          id: 'accidentHistory',
          type: 'select',
          label: 'Accident History (Last 3 Years)',
          required: true,
          options: [
            { value: 'none', label: 'No accidents' },
            { value: '1', label: '1 accident' },
            { value: '2', label: '2 accidents' },
            { value: '3+', label: '3 or more accidents' }
          ]
        },
        {
          id: 'claimsHistory',
          type: 'select',
          label: 'Insurance Claims History',
          required: true,
          options: [
            { value: 'none', label: 'No previous claims' },
            { value: '1-2', label: '1-2 claims' },
            { value: '3+', label: '3+ claims' }
          ]
        },
        {
          id: 'hasTrafficViolations',
          type: 'checkbox',
          label: 'I have traffic violations in the last 2 years',
          required: false
        }
      ]
    },
    {
      id: 'documents',
      title: 'Required Documents',
      description: 'Upload the necessary documents for your application',
      fields: [
        {
          id: 'registrationDoc',
          type: 'file',
          label: 'Vehicle Registration Document',
          required: true
        },
        {
          id: 'licenseDoc',
          type: 'file',
          label: 'Driver\'s License (Both Sides)',
          required: true
        },
        {
          id: 'inspectionCert',
          type: 'file',
          label: 'Vehicle Inspection Certificate',
          required: true
        },
        {
          id: 'vehiclePhotos',
          type: 'file',
          label: 'Vehicle Photos (Front, Back, Sides)',
          required: true
        },
        {
          id: 'previousInsurance',
          type: 'file',
          label: 'Previous Insurance Policy (if applicable)',
          required: false
        }
      ]
    }
  ],
  'health-family': [
    {
      id: 'kyc',
      title: 'Primary Policyholder',
      description: 'Information about the primary policyholder',
      fields: [
        {
          id: 'fullName',
          type: 'text',
          label: 'Full Name',
          required: true
        },
        {
          id: 'dateOfBirth',
          type: 'date',
          label: 'Date of Birth',
          required: true
        },
        {
          id: 'idType',
          type: 'select',
          label: 'ID Type',
          required: true,
          options: [
            { value: 'passport', label: 'Passport' },
            { value: 'national_id', label: 'National ID' }
          ]
        },
        {
          id: 'idNumber',
          type: 'text',
          label: 'ID Number',
          required: true
        },
        {
          id: 'idDocument',
          type: 'file',
          label: 'Upload ID Document',
          required: true
        },
        {
          id: 'phoneNumber',
          type: 'text',
          label: 'Phone Number',
          required: true
        },
        {
          id: 'email',
          type: 'text',
          label: 'Email Address',
          required: true
        },
        {
          id: 'address',
          type: 'textarea',
          label: 'Residential Address',
          required: true
        }
      ]
    },
    {
      id: 'family-members',
      title: 'Family Members',
      description: 'Add family members to be covered',
      fields: [
        {
          id: 'numberOfMembers',
          type: 'select',
          label: 'Number of Family Members to Cover',
          required: true,
          options: [
            { value: '1', label: 'Self only' },
            { value: '2', label: 'Self + 1 member' },
            { value: '3', label: 'Self + 2 members' },
            { value: '4', label: 'Self + 3 members' },
            { value: '5', label: 'Self + 4 members' },
            { value: '6', label: 'Self + 5 members' }
          ]
        },
        {
          id: 'spouseName',
          type: 'text',
          label: 'Spouse Name',
          required: false
        },
        {
          id: 'spouseDob',
          type: 'date',
          label: 'Spouse Date of Birth',
          required: false
        },
        {
          id: 'childrenDetails',
          type: 'textarea',
          label: 'Children Details (Name, Age for each)',
          placeholder: 'Enter each child\'s name and age',
          required: false
        }
      ]
    },
    {
      id: 'medical-history',
      title: 'Medical History',
      description: 'Help us understand your medical background',
      fields: [
        {
          id: 'hasPreExisting',
          type: 'checkbox',
          label: 'I or my family members have pre-existing medical conditions',
          required: false
        },
        {
          id: 'preExistingDetails',
          type: 'textarea',
          label: 'Pre-existing Condition Details',
          placeholder: 'Please describe any pre-existing conditions',
          required: false,
          conditional: {
            field: 'hasPreExisting',
            value: ['true']
          }
        },
        {
          id: 'currentMedications',
          type: 'textarea',
          label: 'Current Medications',
          placeholder: 'List any regular medications',
          required: false
        },
        {
          id: 'recentHospitalizations',
          type: 'select',
          label: 'Hospitalizations in Last 2 Years',
          required: true,
          options: [
            { value: 'none', label: 'None' },
            { value: '1', label: '1 time' },
            { value: '2+', label: '2 or more times' }
          ]
        },
        {
          id: 'smoker',
          type: 'checkbox',
          label: 'Any family member smokes',
          required: false
        }
      ]
    },
    {
      id: 'documents',
      title: 'Required Documents',
      description: 'Upload necessary medical and identification documents',
      fields: [
        {
          id: 'medicalReports',
          type: 'file',
          label: 'Recent Medical Reports (if any)',
          required: false
        },
        {
          id: 'familyIds',
          type: 'file',
          label: 'ID Documents for All Family Members',
          required: true
        },
        {
          id: 'proofOfRelation',
          type: 'file',
          label: 'Proof of Relationship (Marriage Certificate, Birth Certificates)',
          required: true
        }
      ]
    }
  ]
};
