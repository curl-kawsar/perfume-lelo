import {
  customerDetails,
  orderDetails,
  productDetails,
} from "./mock-details";

/**
 * Mock commerce data.
 *
 * The shapes here are the contract the NestJS + Supabase backend will serve.
 * When the real API lands, only the exported functions at the bottom change —
 * components read them, never the arrays.
 */

export type ProductStatus = "live" | "low" | "out" | "draft";
export type OrderStatus =
  | "paid"
  | "fulfilled"
  | "pending"
  | "refunded"
  | "cancelled";

export type Product = {
  id: string;
  sku: string;
  name: string;
  family: "Woody" | "Floral" | "Oriental" | "Fresh";
  concentration: "Eau de Parfum" | "Extrait" | "Eau de Toilette";
  sizeMl: number;
  price: number;
  stock: number;
  status: ProductStatus;
  updatedAt: string;
};

export type Order = {
  id: string;
  customer: string;
  email: string;
  placedAt: string;
  items: number;
  total: number;
  status: OrderStatus;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  city: string;
  orders: number;
  lifetimeValue: number;
  joinedAt: string;
};

export type MonthPoint = { month: string; revenue: number; orders: number };

const products: Product[] = [
  {
    id: "p_01",
    sku: "MV-NOI-100",
    name: "Noir Absolu",
    family: "Oriental",
    concentration: "Extrait",
    sizeMl: 100,
    price: 180,
    stock: 42,
    status: "live",
    updatedAt: "2026-09-08",
  },
  {
    id: "p_02",
    sku: "MV-VET-100",
    name: "Vetiver Gris",
    family: "Woody",
    concentration: "Eau de Parfum",
    sizeMl: 100,
    price: 145,
    stock: 7,
    status: "low",
    updatedAt: "2026-09-07",
  },
  {
    id: "p_03",
    sku: "MV-OUD-050",
    name: "Oud Cendré",
    family: "Oriental",
    concentration: "Extrait",
    sizeMl: 50,
    price: 220,
    stock: 0,
    status: "out",
    updatedAt: "2026-09-05",
  },
  {
    id: "p_04",
    sku: "MV-IRI-100",
    name: "Iris Poudré",
    family: "Floral",
    concentration: "Eau de Parfum",
    sizeMl: 100,
    price: 165,
    stock: 88,
    status: "live",
    updatedAt: "2026-09-09",
  },
  {
    id: "p_05",
    sku: "MV-NER-100",
    name: "Néroli Blanc",
    family: "Fresh",
    concentration: "Eau de Toilette",
    sizeMl: 100,
    price: 120,
    stock: 54,
    status: "live",
    updatedAt: "2026-09-02",
  },
  {
    id: "p_06",
    sku: "MV-SAN-050",
    name: "Santal Brûlé",
    family: "Woody",
    concentration: "Extrait",
    sizeMl: 50,
    price: 210,
    stock: 5,
    status: "low",
    updatedAt: "2026-08-29",
  },
  {
    id: "p_07",
    sku: "MV-ROS-100",
    name: "Rose Nocturne",
    family: "Floral",
    concentration: "Eau de Parfum",
    sizeMl: 100,
    price: 175,
    stock: 31,
    status: "live",
    updatedAt: "2026-09-10",
  },
  {
    id: "p_08",
    sku: "MV-AMB-100",
    name: "Ambre Solaire",
    family: "Oriental",
    concentration: "Eau de Parfum",
    sizeMl: 100,
    price: 155,
    stock: 0,
    status: "draft",
    updatedAt: "2026-09-11",
  },
];

const orders: Order[] = [
  {
    id: "MV-10482",
    customer: "Amara Osei",
    email: "amara.osei@example.com",
    placedAt: "2026-09-12",
    items: 2,
    total: 345,
    status: "paid",
  },
  {
    id: "MV-10481",
    customer: "Tomás Ferreira",
    email: "t.ferreira@example.com",
    placedAt: "2026-09-12",
    items: 1,
    total: 220,
    status: "pending",
  },
  {
    id: "MV-10480",
    customer: "Hana Sato",
    email: "hana.sato@example.com",
    placedAt: "2026-09-11",
    items: 3,
    total: 520,
    status: "fulfilled",
  },
  {
    id: "MV-10479",
    customer: "Lucía Moreno",
    email: "l.moreno@example.com",
    placedAt: "2026-09-11",
    items: 1,
    total: 145,
    status: "fulfilled",
  },
  {
    id: "MV-10478",
    customer: "Dmitri Volkov",
    email: "d.volkov@example.com",
    placedAt: "2026-09-10",
    items: 2,
    total: 400,
    status: "refunded",
  },
  {
    id: "MV-10477",
    customer: "Priya Raghavan",
    email: "priya.r@example.com",
    placedAt: "2026-09-10",
    items: 1,
    total: 180,
    status: "fulfilled",
  },
  {
    id: "MV-10476",
    customer: "Noor Haddad",
    email: "noor.haddad@example.com",
    placedAt: "2026-09-09",
    items: 4,
    total: 665,
    status: "fulfilled",
  },
  {
    id: "MV-10475",
    customer: "Erik Lindqvist",
    email: "erik.l@example.com",
    placedAt: "2026-09-09",
    items: 1,
    total: 120,
    status: "cancelled",
  },
];

const customers: Customer[] = [
  {
    id: "c_01",
    name: "Noor Haddad",
    email: "noor.haddad@example.com",
    city: "Dubai",
    orders: 11,
    lifetimeValue: 3420,
    joinedAt: "2024-03-18",
  },
  {
    id: "c_02",
    name: "Hana Sato",
    email: "hana.sato@example.com",
    city: "Kyoto",
    orders: 9,
    lifetimeValue: 2865,
    joinedAt: "2024-07-02",
  },
  {
    id: "c_03",
    name: "Amara Osei",
    email: "amara.osei@example.com",
    city: "Accra",
    orders: 7,
    lifetimeValue: 2190,
    joinedAt: "2025-01-26",
  },
  {
    id: "c_04",
    name: "Priya Raghavan",
    email: "priya.r@example.com",
    city: "Bengaluru",
    orders: 6,
    lifetimeValue: 1740,
    joinedAt: "2025-04-11",
  },
  {
    id: "c_05",
    name: "Tomás Ferreira",
    email: "t.ferreira@example.com",
    city: "Lisbon",
    orders: 4,
    lifetimeValue: 1105,
    joinedAt: "2025-09-30",
  },
  {
    id: "c_06",
    name: "Lucía Moreno",
    email: "l.moreno@example.com",
    city: "Madrid",
    orders: 3,
    lifetimeValue: 610,
    joinedAt: "2026-02-14",
  },
];

const revenueByMonth: MonthPoint[] = [
  { month: "Oct", revenue: 41200, orders: 248 },
  { month: "Nov", revenue: 58900, orders: 341 },
  { month: "Dec", revenue: 86400, orders: 502 },
  { month: "Jan", revenue: 47300, orders: 279 },
  { month: "Feb", revenue: 52800, orders: 310 },
  { month: "Mar", revenue: 49600, orders: 295 },
  { month: "Apr", revenue: 55100, orders: 322 },
  { month: "May", revenue: 61700, orders: 358 },
  { month: "Jun", revenue: 58300, orders: 339 },
  { month: "Jul", revenue: 64900, orders: 377 },
  { month: "Aug", revenue: 71500, orders: 412 },
  { month: "Sep", revenue: 78200, orders: 449 },
];

const revenueByFamily = [
  { family: "Oriental", revenue: 31400 },
  { family: "Woody", revenue: 22150 },
  { family: "Floral", revenue: 15800 },
  { family: "Fresh", revenue: 8850 },
];

export type Kpi = {
  label: string;
  value: string;
  /** Period-over-period change, already signed. */
  deltaPct: number;
  caption: string;
};

const kpis: Kpi[] = [
  {
    label: "Revenue",
    value: "£78,200",
    deltaPct: 9.4,
    caption: "vs £71,500 in August",
  },
  {
    label: "Orders",
    value: "449",
    deltaPct: 9.0,
    caption: "vs 412 in August",
  },
  {
    label: "Average order",
    value: "£174",
    deltaPct: 0.4,
    caption: "vs £173 in August",
  },
  {
    label: "Returning customers",
    value: "38%",
    deltaPct: -2.1,
    caption: "vs 40% in August",
  },
];

export function getKpis() {
  return kpis;
}

export function getRevenueByMonth() {
  return revenueByMonth;
}

export function getRevenueByFamily() {
  return revenueByFamily;
}

export function getProducts() {
  return products;
}

export function getOrders() {
  return orders;
}

export function getCustomers() {
  return customers;
}

export function getLowStock() {
  return products
    .filter((p) => p.status === "low" || p.status === "out")
    .sort((a, b) => a.stock - b.stock);
}

export const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/* ---------------------------- lookups ---------------------------- */

export function getProductById(id: string) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  return { ...product, detail: productDetails[id] };
}

export function getOrderById(id: string) {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  return { ...order, detail: orderDetails[id] };
}

export function getCustomerById(id: string) {
  const customer = customers.find((c) => c.id === id);
  if (!customer) return null;
  const detail = customerDetails[id];
  return {
    ...customer,
    detail,
    // Orders are stored by id so a customer never holds a stale copy of one.
    history: detail.orderIds
      .map((orderId) => orders.find((o) => o.id === orderId))
      .filter((o): o is Order => Boolean(o)),
  };
}

/** Lets an order link through to the person who placed it. */
export function getCustomerByEmail(email: string) {
  return customers.find((c) => c.email === email) ?? null;
}

/** Resolve a line item back to the catalogue row, when it still exists. */
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku) ?? null;
}

/* ---------------------------- search ----------------------------- */

function matches(query: string, ...fields: (string | number)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => String(f).toLowerCase().includes(q));
}

export function searchProducts(query: string) {
  return products.filter((p) =>
    matches(query, p.name, p.sku, p.family, p.concentration, p.status),
  );
}

export function searchOrders(query: string) {
  return orders.filter((o) =>
    matches(query, o.id, o.customer, o.email, o.status),
  );
}

export function searchCustomers(query: string) {
  return customers.filter((c) => matches(query, c.name, c.email, c.city));
}
