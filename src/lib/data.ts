import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";

export const COMPANY = {
  name: "Majubane Properties",
  director: "Bamanye Majubane",
  email: "bamanyemajubane@gmail.com",
  location: "Port Elizabeth, Eastern Cape, South Africa",
};

export type Listing = {
  id: string;
  title: string;
  suburb: string;
  city: string;
  price: number;
  deal: "Sale" | "Rent";
  type: "House" | "Apartment" | "Townhouse" | "Vacant Land" | "Commercial";
  beds: number;
  baths: number;
  garages: number;
  size: number;
  image: string;
  status: "Available" | "Under Offer" | "Let";
  agent: string;
};

export const listings: Listing[] = [
  {
    id: "MP-1001",
    title: "Modern family home with sea breeze",
    suburb: "Summerstrand",
    city: "Gqeberha (Port Elizabeth)",
    price: 3450000,
    deal: "Sale",
    type: "House",
    beds: 4,
    baths: 3,
    garages: 2,
    size: 320,
    image: prop1,
    status: "Available",
    agent: "Bamanye Majubane",
  },
  {
    id: "MP-1002",
    title: "Beachfront apartment with balcony",
    suburb: "Humewood",
    city: "Gqeberha (Port Elizabeth)",
    price: 12500,
    deal: "Rent",
    type: "Apartment",
    beds: 2,
    baths: 2,
    garages: 1,
    size: 96,
    image: prop2,
    status: "Available",
    agent: "Nomsa Dlamini",
  },
  {
    id: "MP-1003",
    title: "Secure townhouse in family complex",
    suburb: "Lorraine",
    city: "Gqeberha (Port Elizabeth)",
    price: 1890000,
    deal: "Sale",
    type: "Townhouse",
    beds: 3,
    baths: 2,
    garages: 1,
    size: 145,
    image: prop3,
    status: "Under Offer",
    agent: "Bamanye Majubane",
  },
  {
    id: "MP-1004",
    title: "Renovated home near the golf course",
    suburb: "Mill Park",
    city: "Gqeberha (Port Elizabeth)",
    price: 2750000,
    deal: "Sale",
    type: "House",
    beds: 3,
    baths: 2,
    garages: 2,
    size: 210,
    image: prop1,
    status: "Available",
    agent: "Sipho Ngcobo",
  },
  {
    id: "MP-1005",
    title: "Student-friendly flat close to NMU",
    suburb: "Central",
    city: "Gqeberha (Port Elizabeth)",
    price: 6800,
    deal: "Rent",
    type: "Apartment",
    beds: 1,
    baths: 1,
    garages: 0,
    size: 48,
    image: prop2,
    status: "Let",
    agent: "Nomsa Dlamini",
  },
  {
    id: "MP-1006",
    title: "Spacious townhouse with private garden",
    suburb: "Kabega Park",
    city: "Gqeberha (Port Elizabeth)",
    price: 14500,
    deal: "Rent",
    type: "Townhouse",
    beds: 3,
    baths: 2,
    garages: 2,
    size: 160,
    image: prop3,
    status: "Available",
    agent: "Bamanye Majubane",
  },
  {
    id: "MP-1007",
    title: "Coastal plot with development potential",
    suburb: "Jeffreys Bay",
    city: "Kouga, Eastern Cape",
    price: 950000,
    deal: "Sale",
    type: "Vacant Land",
    beds: 0,
    baths: 0,
    garages: 0,
    size: 700,
    image: prop1,
    status: "Available",
    agent: "Sipho Ngcobo",
  },
  {
    id: "MP-1008",
    title: "Ground-floor retail space on a busy street",
    suburb: "Newton Park",
    city: "Gqeberha (Port Elizabeth)",
    price: 28000,
    deal: "Rent",
    type: "Commercial",
    beds: 0,
    baths: 2,
    garages: 4,
    size: 240,
    image: prop2,
    status: "Available",
    agent: "Bamanye Majubane",
  },
];

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  kind: "Buyer" | "Seller" | "Tenant" | "Landlord";
  budget: string;
  requirements: string;
  stage: "New" | "Viewing" | "Negotiating" | "Closed";
  history: { date: string; channel: "Call" | "Email" | "WhatsApp" | "Viewing"; note: string }[];
};

export const clients: Client[] = [
  {
    id: "CL-01",
    name: "Thandiwe Mbeki",
    phone: "+27 82 415 7788",
    email: "thandiwe.mbeki@example.co.za",
    kind: "Buyer",
    budget: "R2.5m – R3.5m",
    requirements: "3+ bedrooms, Summerstrand or Mill Park, secure parking, close to schools.",
    stage: "Viewing",
    history: [
      { date: "2026-08-24", channel: "Viewing", note: "Viewed MP-1001, liked the open-plan living area." },
      { date: "2026-08-21", channel: "Call", note: "Discussed bond pre-approval with the bank." },
    ],
  },
  {
    id: "CL-02",
    name: "Johan van Wyk",
    phone: "+27 71 220 9034",
    email: "johan.vanwyk@example.co.za",
    kind: "Landlord",
    budget: "Rental income R12k+/month",
    requirements: "Wants tenant placement and monthly management for Humewood apartment.",
    stage: "Negotiating",
    history: [
      { date: "2026-08-26", channel: "Email", note: "Sent draft mandate for review." },
      { date: "2026-08-19", channel: "WhatsApp", note: "Confirmed unit is vacant from 1 September." },
    ],
  },
  {
    id: "CL-03",
    name: "Zanele Khumalo",
    phone: "+27 63 771 4412",
    email: "zanele.khumalo@example.co.za",
    kind: "Tenant",
    budget: "R7 000/month",
    requirements: "1 bedroom flat near NMU South Campus, prepaid electricity, pet free.",
    stage: "New",
    history: [{ date: "2026-08-27", channel: "Email", note: "Enquired about MP-1005." }],
  },
  {
    id: "CL-04",
    name: "Riaan & Marie Botha",
    phone: "+27 84 990 1223",
    email: "bothafamily@example.co.za",
    kind: "Seller",
    budget: "Asking R1.95m",
    requirements: "Selling Lorraine townhouse, needs valuation report and marketing plan.",
    stage: "Negotiating",
    history: [
      { date: "2026-08-25", channel: "Call", note: "Offer of R1.85m received, awaiting response." },
      { date: "2026-08-12", channel: "Viewing", note: "Show day hosted, 9 attendees." },
    ],
  },
];

export type Enquiry = {
  id: string;
  client: string;
  listing: string;
  message: string;
  channel: "Website" | "Email" | "Phone" | "WhatsApp";
  received: string;
  status: "New" | "In progress" | "Follow-up" | "Closed";
};

export const enquiriesSeed: Enquiry[] = [
  {
    id: "EN-401",
    client: "Zanele Khumalo",
    listing: "MP-1005 · Central flat",
    message: "Is the flat still available from October and does the rent include water?",
    channel: "Website",
    received: "2026-08-27",
    status: "New",
  },
  {
    id: "EN-402",
    client: "Thandiwe Mbeki",
    listing: "MP-1001 · Summerstrand house",
    message: "Could we arrange a second viewing this Saturday morning?",
    channel: "WhatsApp",
    received: "2026-08-26",
    status: "In progress",
  },
  {
    id: "EN-403",
    client: "Lindiwe Fourie",
    listing: "MP-1006 · Kabega Park townhouse",
    message: "Do you allow two small dogs in the complex?",
    channel: "Email",
    received: "2026-08-25",
    status: "Follow-up",
  },
  {
    id: "EN-404",
    client: "Sibusiso Ntuli",
    listing: "MP-1008 · Newton Park retail",
    message: "Please send the floor plan and the lease escalation terms.",
    channel: "Phone",
    received: "2026-08-24",
    status: "Closed",
  },
];

export type Task = {
  id: string;
  title: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  category: "Viewing" | "Follow-up" | "Admin" | "Marketing";
  done: boolean;
};

export const tasksSeed: Task[] = [
  { id: "T-1", title: "Confirm Saturday viewing for MP-1001", due: "2026-08-28", priority: "High", category: "Viewing", done: false },
  { id: "T-2", title: "Send lease agreement to Johan van Wyk", due: "2026-08-29", priority: "High", category: "Admin", done: false },
  { id: "T-3", title: "Follow up on the R1.85m offer (Lorraine)", due: "2026-08-30", priority: "Medium", category: "Follow-up", done: false },
  { id: "T-4", title: "Photograph Kabega Park townhouse", due: "2026-09-01", priority: "Medium", category: "Marketing", done: false },
  { id: "T-5", title: "Update FICA documents for new tenants", due: "2026-09-03", priority: "Low", category: "Admin", done: true },
];

export type Notification = { id: string; text: string; time: string };

export const notifications: Notification[] = [
  { id: "N-1", text: "New website enquiry from Zanele Khumalo", time: "12 min ago" },
  { id: "N-2", text: "Offer received on MP-1003 (Lorraine)", time: "2 hours ago" },
  { id: "N-3", text: "Lease renewal due for MP-1005 in 14 days", time: "Yesterday" },
];

export function formatPrice(l: Listing) {
  const value = new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(l.price);
  return l.deal === "Rent" ? `R ${value} pm` : `R ${value}`;
}
