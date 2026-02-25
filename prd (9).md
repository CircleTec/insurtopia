# Insurtopia Whitelable Underwriting Application - Product Requirements Document


## Executive Summary

The **Insurtopia Whitelable Underwriting Application** is a modern, flexible, and automated digital platform designed to manage the end-to-end policy application process for Ethiopian insurance companies. As a white-label SaaS product, it enables insurers to offer a seamless digital experience from user browsing to final policy delivery. The system supports a multi-product structure, secure user journeys, and a "human-in-the-loop" process for manual risk review and final quote approval.

### What Makes This Special

*   **White-label SaaS Model:** tailored specifically for the Ethiopian market, allowing rapid deployment and branding by multiple insurers.
*   **Hybrid Workflow:** Seamlessly blends automated risk assessment with manual underwriter review.
*   **Multi-Product Support:** Flexible architecture to handle various insurance products.

---

## User Journeys

### Journey 1: Customer - Policy Application (Happy Path)
A customer wants to buy insurance quickly and easily.

*   **Entry Point:** Customer visits the insurer's branded web or mobile app.
*   **Steps:**
    1.  **Selection:** Browses policy catalog via Policy Selector and starts quote.
    2.  **KYC & Data Collection:** Completes multi-step form including KYC information and risk details.
    3.  **Document Upload:** Uploads required documents via Document Upload Tool.
    4.  **Verification:** System validates data and runs Rule Engine Service (RES) for risk assessment.
    5.  **Decision:** System approves automatically or flags for manual referral.
    6.  **Quote:** Receives quote (instant or after review).
    7.  **Acceptance:** Reviews quote, agrees to terms, and provides E-Signature.
    8.  **Payment:** Submits payment via PCI-compliant Payment Gateway.
    9.  **Issuance:** System triggers Policy Issuance API.
    10. **Delivery:** Downloads secure PDF policy document.
*   **Success Moment:** Receives digital policy document instantly.

### Journey 2: Underwriter - Manual Review
An underwriter needs to review a complex application flagged by the system.

*   **Entry Point:** Underwriter logs into the Admin Portal.
*   **Steps:**
    1.  **Handoff:** System flags application for manual review; status updates to REVIEW_MANUAL_DOCS.
    2.  **Dashboard:** Accesses application via Underwriter Dashboard.
    3.  **Review:** Reviews documents and applicant details.
    4.  **Quote Generation:** Generates or adjusts initial quote.
    5.  **Final Approval:** Edits premium if needed and sets Employee Approval flag to TRUE.
    6.  **Offer Display:** Status updates to QUOTE_READY; customer notified.
*   **Success Moment:** Application is processed, and quote is sent to customer.

### Journey 3: Admin - Product Configuration
An insurance administrator wants to launch a new insurance product.

*   **Entry Point:** Admin logs into the Admin Portal.
*   **Steps:**
    1.  **Form Creation:** Uses Form Builder Tool to create data collection forms.
    2.  **Rule Definition:** Configures underwriting rules in Rule Engine Service (RES).
    3.  **Policy Assignment:** Maps forms and rules to a public-facing policy product.
*   **Success Moment:** New product is live and available for customers to purchase.

---

## Project Classification

**Technical Type:** SaaS B2B / Web App / Mobile App
**Domain:** InsurTech / FinTech
**Complexity:** High (Regulatory, Financial, Security)

### Domain Context

*   **Regulatory Compliance:** Must adhere to Ethiopian insurance regulations.
*   **Data Security:** Handling sensitive personal and financial data requires strict security measures.
*   **Financial Accuracy:** Quotes and payments must be calculated with high precision.

---

## Success Criteria

*   **Market Adoption:** Onboarding multiple Ethiopian insurance companies as tenants.
*   **Operational Efficiency:** Reducing the time and cost of underwriting for client insurers.
*   **Customer Satisfaction:** Providing a superior digital experience for insurance buyers.
*   **Time to Quote:** Average time from application submission to quote generation.
*   **Conversion Rate:** Percentage of applications that result in a bound policy.

---

## Product Scope

### MVP - Minimum Viable Product

*   **Admin Portal:**
    *   Form Builder Tool
    *   Underwriter Dashboard
    *   Product Configuration
*   **User Web/Mobile App:**
    *   Policy Selector
    *   Document Upload Tool
    *   Transparent Progress Tracker
    *   KYC Data Collection
*   **Backend Services:**
    *   Rule Engine Service (RES)
    *   PCI-Compliant Payment Gateway
    *   Policy Issuance API
    *   PDF Generation Service

### Growth Features (Post-MVP)

*   Advanced analytics and reporting for insurers.
*   AI-driven risk assessment enhancements.
*   Integration with third-party data sources (e.g., vehicle databases).

### Vision (Future)

*   Fully automated underwriting for 90% of cases.
*   Ecosystem integration with brokers and agents.

---

## Technical Architecture

*   **Stack:** MERN (MongoDB, Express, React, Node.js).
*   **Mobile:** React Native.
*   **Security:** Standard industry practices for authentication and security; PCI-compliant payment process.
*   **UI/UX:** Highly intuitive and beautiful interface across all portals.

---

## Functional Requirements

### 1. User Management & Authentication
*   **FR1.1:** Users (Customers, Underwriters, Admins) can register for an account using email and password.
*   **FR1.2:** Users can log in securely using email/password with session management (JWT).
*   **FR1.3:** System must enforce strong password policies (min length, special chars).
*   **FR1.4:** Users can request a password reset link via email and securely reset their credentials.
*   **FR1.5:** System must support Role-Based Access Control (RBAC) to restrict access to Admin, Underwriter, and Customer portals.
*   **FR1.6:** System must automatically log out users after a configurable period of inactivity.

### 2. Product Management (Admin Portal)
*   **FR2.1:** Admins can create new insurance products with metadata (Name, Description, Code, Effective Dates).
*   **FR2.2:** Admins can configure product-specific parameters (Coverage Limits, Deductibles, Premium Rates).
*   **FR2.3:** Admins can use a **Form Builder Tool** to design application forms via drag-and-drop interface.
    *   *FR2.3.1:* Support for various field types (Text, Number, Date, Select, File Upload).
    *   *FR2.3.2:* Ability to define field validation rules (Required, Regex, Min/Max).
    *   *FR2.3.3:* Ability to define conditional logic (Show/Hide fields based on previous answers).
*   **FR2.4:** Admins can publish products to the User Web/Mobile App catalog.
*   **FR2.5:** Admins can archive or deactivate products to prevent new applications.

### 3. Rule Engine Service (RES) Configuration (Admin Portal)
*   **FR3.1:** Admins can define underwriting rules using a logical expression builder (e.g., "IF RiskScore > 80 THEN Referral").
*   **FR3.2:** Admins can configure risk scoring models based on applicant data inputs.
*   **FR3.3:** Admins can define decision outcomes: `AUTO_APPROVE`, `AUTO_DECLINE`, or `MANUAL_REFERRAL`.
*   **FR3.4:** Admins can map specific rule sets to specific insurance products.
*   **FR3.5:** System must version control rule sets to track changes over time.

### 4. Application Processing (User Web/Mobile App)
*   **FR4.1:** Customers can browse the **Policy Selector** catalog with filtering and search capabilities.
*   **FR4.2:** Customers can view detailed product information (Benefits, Exclusions, Pricing estimates).
*   **FR4.3:** Customers can start a new application and save progress as a draft.
*   **FR4.4:** Customers must complete a **KYC (Know Your Customer)** step:
    *   *FR4.4.1:* Upload ID document (Passport/National ID).
    *   *FR4.4.2:* Enter personal details (Full Name, DOB, Address, Tax ID).
    *   *FR4.4.3:* System validates ID format and completeness.
*   **FR4.5:** Customers can complete the dynamic application form generated by the Form Builder.
*   **FR4.6:** Customers can use the **Document Upload Tool** to upload supporting evidence (Images, PDFs).
    *   *FR4.6.1:* System must validate file type and size limits.
    *   *FR4.6.2:* System must scan uploads for malware.
*   **FR4.7:** Customers can view the **Transparent Progress Tracker** showing current status (e.g., "Under Review", "Action Required").

### 5. Automated Underwriting (Backend)
*   **FR5.1:** System triggers the Rule Engine Service (RES) immediately upon application submission.
*   **FR5.2:** RES evaluates application data against configured rules for the selected product.
*   **FR5.3:** System assigns an initial status based on RES outcome:
    *   *Approved:* Triggers quote generation.
    *   *Declined:* Sends rejection notification with reasons.
    *   *Referral:* Flags for manual review and notifies underwriters.

### 6. Underwriter Workbench (Admin Portal)
*   **FR6.1:** Underwriters can view a **Dashboard** of applications in "Manual Referral" status.
*   **FR6.2:** Underwriters can filter and sort the queue by Date, Product, Risk Score, or Applicant Name.
*   **FR6.3:** Underwriters can view the full application details, including KYC data and RES risk flags.
*   **FR6.4:** Underwriters can securely preview uploaded documents within the browser.
*   **FR6.5:** Underwriters can perform actions:
    *   *Approve:* Overrides RES flag and triggers quote.
    *   *Decline:* Rejects application with custom notes.
    *   *Request Info:* Sends email/notification to customer requesting specific details/documents.
*   **FR6.6:** Underwriters can manually adjust premium loadings or discounts before final approval.

### 7. Policy Issuance & Payment
*   **FR7.1:** Customers can view the **Final Quote** with breakdown of premium, taxes, and fees.
*   **FR7.2:** Customers can accept the quote and provide **E-Signature Attestation** (checkbox/typed name with timestamp).
*   **FR7.3:** System redirects to **Payment Gateway** for processing  Mobile Money.
*   **FR7.4:** Upon successful payment, System triggers **Policy Issuance API** to generate a unique Policy Number.
*   **FR7.5:** **PDF Generation Service** creates the policy schedule and certificate.
    *   *FR7.5.1:* PDF must be read-only and password protected (optional).
    *   *FR7.5.2:* PDF must include digital signature/stamp.
*   **FR7.6:** System emails the policy PDF to the customer and makes it available for download in the portal.

---

## Non-Functional Requirements

### Security
*   **Data Encryption:** All sensitive data encrypted at rest and in transit.
*   **Access Control:** Strict RBAC and audit logging.
*   **Compliance:** PCI-DSS compliance for payments.

### Performance
*   **Response Time:** Web/Mobile app pages load within 2 seconds.
*   **Scalability:** Architecture supports horizontal scaling for multi-tenant load.

### Reliability
*   **Availability:** 99.9% uptime target.

---

_This PRD captures the essence of Insurtopia Whitelable Underwriting Application - A modern, white-label insurance platform for Ethiopia._