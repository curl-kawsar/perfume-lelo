import Link from "next/link";
import { Topbar } from "@/components/admin/Topbar";
import { OrderBadge } from "@/components/admin/StatusBadge";
import { LinkRow } from "@/components/admin/LinkRow";
import { Chevron, EmptyRow } from "@/components/admin/ui";
import { gbp, searchOrders } from "@/lib/mock-data";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const orders = searchOrders(q);
  const value = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      <Topbar
        title="Orders"
        subtitle={
          q
            ? `${orders.length} match “${q}” · ${gbp.format(value)}`
            : `${orders.length} orders · ${gbp.format(value)} placed this week`
        }
        searchPlaceholder="Search orders"
      />

      <main className="min-w-0 flex-1 bg-plane p-5 lg:p-8">
        <div className="min-w-0 overflow-hidden rounded-lg border border-grid bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] text-[0.8125rem]">
              <thead>
                <tr className="border-b border-grid text-left text-ink-2">
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Order
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Placed
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Items
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Total
                  </th>
                  <th scope="col" className="w-8 px-4 py-2.5">
                    <span className="sr-only">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <EmptyRow colSpan={7} query={q} />
                ) : (
                  orders.map((order) => (
                    <LinkRow key={order.id} href={`/admin/orders/${order.id}`}>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-[0.75rem] text-ink-2 hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink-1">
                          {order.customer}
                        </p>
                        <p className="text-[0.75rem] text-ink-3">
                          {order.email}
                        </p>
                      </td>
                      <td className="tnum px-4 py-3 text-ink-2">
                        {order.placedAt}
                      </td>
                      <td className="tnum px-4 py-3 text-right text-ink-2">
                        {order.items}
                      </td>
                      <td className="px-4 py-3">
                        <OrderBadge status={order.status} />
                      </td>
                      <td className="tnum px-4 py-3 text-right font-medium text-ink-1">
                        {gbp.format(order.total)}
                      </td>
                      <td className="px-4 py-3">
                        <Chevron />
                      </td>
                    </LinkRow>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
