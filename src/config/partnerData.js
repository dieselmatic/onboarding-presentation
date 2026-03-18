/**
 * Partner Data Configuration
 *
 * This is the "API contract." For the POC, all data is hardcoded here.
 * In production, this shape will be returned by:
 *   GET app.dieselmatic.com/api/onboarding/{dealId}/config
 *
 * To swap to live data, replace the import of this file with a fetch() call
 * that returns the same shape.
 */
export const PARTNER_DATA = {
  companyName: "Big Rig Diesel Repair",
  ownerFirstName: "Mike",
  ownerLastName: "Thompson",
  city: "Houston",
  state: "TX",
  address: "4521 Industrial Blvd, Houston, TX 77015",
  phone: "(713) 555-0187",
  website: "bigrigdieselrepair.com",
  services: [
    "DPF Cleaning & Regeneration", "Diesel Engine Repair", "Turbo Repair & Replacement",
    "Fleet Maintenance Programs", "Diesel Diagnostics", "Transmission Repair",
    "Brake Service", "Electrical Systems", "A/C Service", "Preventive Maintenance",
  ],
  topSpecialties: ["DPF Cleaning & Regeneration", "Turbo Repair & Replacement", "Fleet Maintenance Programs"],
  targetRadiusMiles: 30,
  competitors: [
    { name: "Lone Star Diesel Works", url: "lonestardieselworks.com" },
    { name: "Gulf Coast Truck Repair", url: "gulfcoasttruckrepair.com" },
    { name: "Bayou City Diesel", url: "bayoucitydiesel.com" },
  ],
  planTier: "Turbo",
  planIncludes: [
    { name: "Custom Dieselmatic Website", included: true, icon: "globe" },
    { name: "Google Ads Management", included: true, icon: "target" },
    { name: "Local SEO & GBP Optimization", included: true, icon: "search" },
    { name: "Citation Building", included: true, icon: "list" },
    { name: "Social Media Management", included: true, icon: "share" },
    { name: "Reputation Management", included: true, icon: "star" },
    { name: "Monthly Reporting Dashboard", included: true, icon: "chart" },
    { name: "Dedicated Account Manager", included: true, icon: "user" },
  ],
  monthlyAdsBudget: 1500,
  estimatedCPC: 5.50,
  estimatedConversionRate: 10,
  estimatedCloseRate: 50,
  averageInvoice: 1200,
  profitMargin: 30,
  amName: "Marie Fontaine",
  amTitle: "Senior Account Manager",
  amEmail: "marie@dieselmatic.com",
  amPhone: "(604) 555-0234",
  amCalendarLink: "https://calendly.com/dieselmatic-marie",
  onboardingCallDate: "2026-03-17",
  estimatedPhase1Launch: "2026-03-31",
  estimatedPhase2Launch: "2026-04-14",
  portalLink: "https://app.dieselmatic.com/onboarding/big-rig-diesel",
};
