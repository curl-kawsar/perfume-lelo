import Link from "next/link";
import { Topbar } from "@/components/admin/Topbar";
import { StatTile } from "@/components/admin/StatTile";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { FamilyBars } from "@/components/admin/FamilyBars";
import { OrderBadge } from "@/components/admin/StatusBadge";
import { LinkRow } from "@/components/admin/LinkRow";
import { Chevron } from "@/components/admin/ui";
import {
  gbp,
  getKpis,
  getLowStock,
  getOrders,
  getRevenueByFamily,
  getRevenueByMonth,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const kpis = getKpis();
  const revenue = getRevenueByMonth();
  const families = getRevenueByFamily();
  const recent = getOrders().slice(0, 5);
  const lowStock = getLowStock();

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="September 2026"
        action={
          <button
            type="button"
            className="h-8 rounded-md bg-ink-1 px-3 text-[0.8125rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Export report
          </button>
        }
      />

      <main className="min-w-0 flex-1 space-y-5 bg-plane p-5 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <StatTile key={kpi.label} kpi={kpi} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <RevenueChart data={revenue} />
          <FamilyBars data={families} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="rounded-lg border border-grid bg-surface">
            <div className="flex items-center justify-between border-b border-grid px-4 py-3">
              <h2 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
                Recent orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-[0.8125rem] font-medium text-ink-2 transition-colors hover:text-ink-1"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-[0.8125rem]">
                <thead>
                  <tr className="border-b border-grid text-left text-ink-2">
                    <th scope="col" className="px-4 py-2 font-medium">
                      Order
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Customer
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-right font-medium"
                    >
                      Total
                    </th>
                    <th scope="col" className="w-8 px-4 py-2">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((order) => (
                    <LinkRow key={order.id} href={`/admin/orders/${order.id}`}>
                      <td className="whitespace-nowrap px-4 py-2.5">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-[0.75rem] text-ink-2 hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-ink-1">
                        {order.customer}
                      </td>
                      <td className="px-4 py-2.5">
                        <OrderBadge status={order.status} />
                      </td>
                      <td className="tnum px-4 py-2.5 text-right font-medium text-ink-1">
                        {gbp.format(order.total)}
                      </td>
                      <td className="px-4 py-2.5">
                        <Chevron />
                      </td>
                    </LinkRow>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-grid bg-surface">
            <div className="flex items-center justify-between border-b border-grid px-4 py-3">
              <h2 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
                Needs restocking
              </h2>
              <span className="tnum rounded-full bg-plane px-2 py-0.5 text-[0.75rem] font-medium text-ink-2">
                {lowStock.length}
              </span>
            </div>

            <ul className="divide-y divide-grid/70">
              {lowStock.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-plane"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[0.8125rem] text-ink-1">
                        {product.name}
                      </p>
                      <p className="font-mono text-[0.75rem] text-ink-3">
                        {product.sku}
                      </p>
                    </div>
                    <span
                      className={`tnum shrink-0 text-[0.8125rem] font-medium ${
                        product.stock === 0 ? "text-critical" : "text-ink-1"
                      }`}
                    >
                      {product.stock} left
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
