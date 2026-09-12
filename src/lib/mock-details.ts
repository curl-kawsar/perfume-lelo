/**
 * Detail records, kept beside the list rows rather than inside them.
 *
 * A list endpoint returns the summary row; a detail endpoint returns this.
 * That is the same split the NestJS controllers will have, so components
 * written against it will not need reshaping when the real API lands.
 */

export type Note = { stage: "Top" | "Heart" | "Base"; accord: string };

export type ProductDetail = {
  description: string;
  notes: Note[];
  perfumer: string;
  launchedAt: string;
  costPrice: number;
  unitsSold: number;
  returnsPct: number;
};

export const productDetails: Record<string, ProductDetail> = {
  p_01: {
    description:
      "Smoke over cold stone. Built on an oud-and-leather base that stays close to the skin for a full day, with just enough bergamot at the opening to keep it from reading as heavy.",
    notes: [
      { stage: "Top", accord: "Bergamot, pink pepper" },
      { stage: "Heart", accord: "Iris, cashmere leather" },
      { stage: "Base", accord: "Oud, vetiver, ambrette" },
    ],
    perfumer: "Céline Aubert",
    launchedAt: "2024-11-02",
    costPrice: 41,
    unitsSold: 1284,
    returnsPct: 1.8,
  },
  p_02: {
    description:
      "Dry vetiver root with the earth still on it. The grapefruit opening burns off quickly and leaves something closer to a woodshop floor than a cologne.",
    notes: [
      { stage: "Top", accord: "Grapefruit, cardamom" },
      { stage: "Heart", accord: "Vetiver, dry cedar" },
      { stage: "Base", accord: "Oakmoss, tonka" },
    ],
    perfumer: "Marc Delacroix",
    launchedAt: "2025-03-14",
    costPrice: 33,
    unitsSold: 902,
    returnsPct: 2.4,
  },
  p_03: {
    description:
      "The most concentrated extrait in the range. Burnt oud and ash, softened with a little rose so it does not tip into antiseptic. Sold in 50 ml only.",
    notes: [
      { stage: "Top", accord: "Saffron, clove" },
      { stage: "Heart", accord: "Turkish rose, incense" },
      { stage: "Base", accord: "Smoked oud, birch tar" },
    ],
    perfumer: "Céline Aubert",
    launchedAt: "2023-09-21",
    costPrice: 58,
    unitsSold: 611,
    returnsPct: 3.1,
  },
  p_04: {
    description:
      "Cosmetic-counter iris — powdery, cool and slightly waxy — over a clean musk. The most-gifted bottle in the range.",
    notes: [
      { stage: "Top", accord: "Violet leaf, aldehydes" },
      { stage: "Heart", accord: "Iris butter, orris" },
      { stage: "Base", accord: "White musk, sandalwood" },
    ],
    perfumer: "Ines Oyelaran",
    launchedAt: "2025-01-30",
    costPrice: 37,
    unitsSold: 1533,
    returnsPct: 1.2,
  },
  p_05: {
    description:
      "Bitter orange flower picked before it opens. The lightest thing in the range and the only eau de toilette.",
    notes: [
      { stage: "Top", accord: "Petitgrain, lemon" },
      { stage: "Heart", accord: "Neroli, orange blossom" },
      { stage: "Base", accord: "White amber" },
    ],
    perfumer: "Ines Oyelaran",
    launchedAt: "2025-06-08",
    costPrice: 26,
    unitsSold: 1105,
    returnsPct: 2.0,
  },
  p_06: {
    description:
      "Sandalwood held over a flame — milky at first, then resinous. Small batch; the mill in Mysore caps what we can buy each year.",
    notes: [
      { stage: "Top", accord: "Pink peppercorn" },
      { stage: "Heart", accord: "Mysore sandalwood" },
      { stage: "Base", accord: "Benzoin, cade" },
    ],
    perfumer: "Marc Delacroix",
    launchedAt: "2024-05-17",
    costPrice: 62,
    unitsSold: 488,
    returnsPct: 1.5,
  },
  p_07: {
    description:
      "Rose after dark: jammy damask rose cut with blackcurrant, over a patchouli base that keeps it from turning sweet.",
    notes: [
      { stage: "Top", accord: "Blackcurrant, lychee" },
      { stage: "Heart", accord: "Damask rose, peony" },
      { stage: "Base", accord: "Patchouli, musk" },
    ],
    perfumer: "Céline Aubert",
    launchedAt: "2025-08-25",
    costPrice: 44,
    unitsSold: 767,
    returnsPct: 2.8,
  },
  p_08: {
    description:
      "Warm amber and salt. Still in draft — the base is being reworked after the July panel found it too close to Noir Absolu.",
    notes: [
      { stage: "Top", accord: "Bergamot, sea salt" },
      { stage: "Heart", accord: "Labdanum, jasmine" },
      { stage: "Base", accord: "Amber, benzoin, vanilla" },
    ],
    perfumer: "Ines Oyelaran",
    launchedAt: "Not launched",
    costPrice: 39,
    unitsSold: 0,
    returnsPct: 0,
  },
};

export type OrderLine = {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type TimelineEvent = { at: string; label: string };

export type OrderDetail = {
  lines: OrderLine[];
  shipping: number;
  tax: number;
  address: string[];
  method: string;
  payment: string;
  timeline: TimelineEvent[];
};

export const orderDetails: Record<string, OrderDetail> = {
  "MV-10482": {
    lines: [
      { sku: "MV-NOI-100", name: "Noir Absolu", quantity: 1, unitPrice: 180 },
      { sku: "MV-NER-100", name: "Néroli Blanc", quantity: 1, unitPrice: 120 },
    ],
    shipping: 12,
    tax: 33,
    address: ["Amara Osei", "14 Ridge Road", "Accra", "GA-142-8820", "Ghana"],
    method: "DHL Express",
    payment: "Visa ending 4417",
    timeline: [
      { at: "2026-09-12 09:14", label: "Order placed" },
      { at: "2026-09-12 09:14", label: "Payment authorised" },
      { at: "2026-09-12 11:02", label: "Payment captured" },
    ],
  },
  "MV-10481": {
    lines: [
      { sku: "MV-OUD-050", name: "Oud Cendré", quantity: 1, unitPrice: 220 },
    ],
    shipping: 0,
    tax: 0,
    address: [
      "Tomás Ferreira",
      "Rua da Prata 68",
      "Lisbon",
      "1100-414",
      "Portugal",
    ],
    method: "Awaiting selection",
    payment: "Bank transfer — not yet received",
    timeline: [
      { at: "2026-09-12 08:40", label: "Order placed" },
      { at: "2026-09-12 08:40", label: "Awaiting payment" },
    ],
  },
  "MV-10480": {
    lines: [
      { sku: "MV-IRI-100", name: "Iris Poudré", quantity: 2, unitPrice: 165 },
      { sku: "MV-VET-100", name: "Vetiver Gris", quantity: 1, unitPrice: 145 },
    ],
    shipping: 14,
    tax: 31,
    address: ["Hana Sato", "3-12-4 Gion", "Kyoto", "605-0073", "Japan"],
    method: "DHL Express",
    payment: "Mastercard ending 9021",
    timeline: [
      { at: "2026-09-11 15:22", label: "Order placed" },
      { at: "2026-09-11 15:23", label: "Payment captured" },
      { at: "2026-09-11 17:40", label: "Picked and packed" },
      { at: "2026-09-12 07:15", label: "Handed to carrier" },
    ],
  },
  "MV-10479": {
    lines: [
      { sku: "MV-VET-100", name: "Vetiver Gris", quantity: 1, unitPrice: 145 },
    ],
    shipping: 8,
    tax: 26,
    address: [
      "Lucía Moreno",
      "Calle de Alcalá 210",
      "Madrid",
      "28028",
      "Spain",
    ],
    method: "Correos Express",
    payment: "Visa ending 7732",
    timeline: [
      { at: "2026-09-11 10:05", label: "Order placed" },
      { at: "2026-09-11 10:06", label: "Payment captured" },
      { at: "2026-09-11 16:30", label: "Picked and packed" },
      { at: "2026-09-12 08:00", label: "Handed to carrier" },
    ],
  },
  "MV-10478": {
    lines: [
      { sku: "MV-SAN-050", name: "Santal Brûlé", quantity: 1, unitPrice: 210 },
      { sku: "MV-NER-100", name: "Néroli Blanc", quantity: 1, unitPrice: 120 },
    ],
    shipping: 10,
    tax: 36,
    address: [
      "Dmitri Volkov",
      "Kurfürstendamm 11",
      "Berlin",
      "10719",
      "Germany",
    ],
    method: "DHL Standard",
    payment: "Visa ending 1188",
    timeline: [
      { at: "2026-09-10 12:44", label: "Order placed" },
      { at: "2026-09-10 12:45", label: "Payment captured" },
      { at: "2026-09-11 09:10", label: "Return requested — wrong size" },
      { at: "2026-09-11 14:02", label: "Refunded in full" },
    ],
  },
  "MV-10477": {
    lines: [
      { sku: "MV-NOI-100", name: "Noir Absolu", quantity: 1, unitPrice: 180 },
    ],
    shipping: 9,
    tax: 32,
    address: [
      "Priya Raghavan",
      "42 Church Street",
      "Bengaluru",
      "560001",
      "India",
    ],
    method: "DHL Express",
    payment: "Amex ending 3006",
    timeline: [
      { at: "2026-09-10 07:18", label: "Order placed" },
      { at: "2026-09-10 07:19", label: "Payment captured" },
      { at: "2026-09-10 18:20", label: "Picked and packed" },
      { at: "2026-09-11 06:45", label: "Handed to carrier" },
    ],
  },
  "MV-10476": {
    lines: [
      { sku: "MV-ROS-100", name: "Rose Nocturne", quantity: 2, unitPrice: 175 },
      { sku: "MV-IRI-100", name: "Iris Poudré", quantity: 1, unitPrice: 165 },
      { sku: "MV-NER-100", name: "Néroli Blanc", quantity: 1, unitPrice: 120 },
    ],
    shipping: 16,
    tax: 119,
    address: [
      "Noor Haddad",
      "Villa 7, Al Wasl Road",
      "Dubai",
      "United Arab Emirates",
    ],
    method: "DHL Express",
    payment: "Visa ending 5510",
    timeline: [
      { at: "2026-09-09 19:31", label: "Order placed" },
      { at: "2026-09-09 19:32", label: "Payment captured" },
      { at: "2026-09-10 08:55", label: "Picked and packed" },
      { at: "2026-09-10 15:20", label: "Handed to carrier" },
    ],
  },
  "MV-10475": {
    lines: [
      { sku: "MV-NER-100", name: "Néroli Blanc", quantity: 1, unitPrice: 120 },
    ],
    shipping: 0,
    tax: 0,
    address: ["Erik Lindqvist", "Sveavägen 44", "Stockholm", "111 34", "Sweden"],
    method: "Not shipped",
    payment: "Authorisation released",
    timeline: [
      { at: "2026-09-09 11:02", label: "Order placed" },
      { at: "2026-09-09 11:48", label: "Cancelled by customer" },
    ],
  },
};

export type CustomerDetail = {
  phone: string;
  address: string[];
  firstOrderAt: string;
  lastOrderAt: string;
  favouriteFamily: string;
  marketingOptIn: boolean;
  /** Order ids, newest first. */
  orderIds: string[];
};

export const customerDetails: Record<string, CustomerDetail> = {
  c_01: {
    phone: "+971 50 221 8840",
    address: ["Villa 7, Al Wasl Road", "Dubai", "United Arab Emirates"],
    firstOrderAt: "2024-03-18",
    lastOrderAt: "2026-09-09",
    favouriteFamily: "Floral",
    marketingOptIn: true,
    orderIds: ["MV-10476"],
  },
  c_02: {
    phone: "+81 75 344 1120",
    address: ["3-12-4 Gion", "Kyoto", "Japan"],
    firstOrderAt: "2024-07-02",
    lastOrderAt: "2026-09-11",
    favouriteFamily: "Floral",
    marketingOptIn: true,
    orderIds: ["MV-10480"],
  },
  c_03: {
    phone: "+233 30 274 9912",
    address: ["14 Ridge Road", "Accra", "Ghana"],
    firstOrderAt: "2025-01-26",
    lastOrderAt: "2026-09-12",
    favouriteFamily: "Oriental",
    marketingOptIn: false,
    orderIds: ["MV-10482"],
  },
  c_04: {
    phone: "+91 80 4123 7788",
    address: ["42 Church Street", "Bengaluru", "India"],
    firstOrderAt: "2025-04-11",
    lastOrderAt: "2026-09-10",
    favouriteFamily: "Oriental",
    marketingOptIn: true,
    orderIds: ["MV-10477"],
  },
  c_05: {
    phone: "+351 21 880 4471",
    address: ["Rua da Prata 68", "Lisbon", "Portugal"],
    firstOrderAt: "2025-09-30",
    lastOrderAt: "2026-09-12",
    favouriteFamily: "Oriental",
    marketingOptIn: false,
    orderIds: ["MV-10481"],
  },
  c_06: {
    phone: "+34 91 220 6633",
    address: ["Calle de Alcalá 210", "Madrid", "Spain"],
    firstOrderAt: "2026-02-14",
    lastOrderAt: "2026-09-11",
    favouriteFamily: "Woody",
    marketingOptIn: true,
    orderIds: ["MV-10479"],
  },
};
