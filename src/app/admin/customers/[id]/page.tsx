import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { OrderBadge } from "@/components/admin/StatusBadge";
import { BackLink, Card, CardHeader, Field } from "@/components/admin/ui";
import { gbp, getCustomerById } from "@/lib/mock-data";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = getCustomerById(id);
  if (!customer) notFound();

  const { detail, history } = customer;
  const averageOrder = Math.round(customer.lifetimeValue / customer.orders);

  return (
    <>
      <Topbar
        title={customer.name}
        subtitle={customer.email}
        action={
          <a
            href={`mailto:${customer.email}`}
            className="flex h-8 shrink-0 items-center rounded-md border border-grid bg-surface px-3 text-[0.8125rem] font-medium text-ink-1 transition-colors hover:bg-plane"
          >
            Email customer
          </a>
        }
      />

      <main className="min-w-0 flex-1 space-y-5 bg-plane p-5 lg:p-8">
        <BackLink href="/admin/customers">All customers</BackLink>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-[0.75rem] font-medium text-ink-2">
              Lifetime value
            </p>
            <p className="tnum mt-2 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-1">
              {gbp.format(customer.lifetimeValue)}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-[0.75rem] font-medium text-ink-2">Orders</p>
            <p className="tnum mt-2 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-1">
              {customer.orders}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-[0.75rem] font-medium text-ink-2">
              Average order
            </p>
            <p className="tnum mt-2 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-1">
              {gbp.format(averageOrder)}
            </p>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card>
            <CardHeader
              title="Order history"
              meta={`${history.length} shown of ${customer.orders}`}
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-[0.8125rem]">
                <thead>
                  <tr className="border-b border-grid text-left text-ink-2">
                    <th scope="col" className="px-4 py-2 font-medium">
                      Order
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Placed
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-2 text-right font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-grid/70 last:border-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-[0.75rem] text-ink-2 hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="tnum px-4 py-3 text-ink-2">
                        {order.placedAt}
                      </td>
                      <td className="px-4 py-3">
                        <OrderBadge status={order.status} />
                      </td>
                      <td className="tnum px-4 py-3 text-right font-medium text-ink-1">
                        {gbp.format(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-grid px-4 py-3 text-[0.75rem] text-ink-3">
              Earlier orders live in the archive and are not part of the mock
              data.
            </p>
          </Card>

          <Card>
            <CardHeader title="Contact" />
            <dl className="space-y-4 p-4">
              <Field label="Email">
                <a href={`mailto:${customer.email}`} className="hover:underline">
                  {customer.email}
                </a>
              </Field>
              <Field label="Phone">
                <a
                  href={`tel:${detail.phone.replace(/\s/g, "")}`}
                  className="tnum hover:underline"
                >
                  {detail.phone}
                </a>
              </Field>
              <Field label="Address">
                <span className="block whitespace-pre-line leading-relaxed">
                  {detail.address.join("\n")}
                </span>
              </Field>
              <Field label="Customer since">
                <span className="tnum">{detail.firstOrderAt}</span>
              </Field>
              <Field label="Last ordered">
                <span className="tnum">{detail.lastOrderAt}</span>
              </Field>
              <Field label="Buys most">{detail.favouriteFamily}</Field>
              <Field label="Marketing email">
                {detail.marketingOptIn ? "Subscribed" : "Not subscribed"}
              </Field>
            </dl>
          </Card>
        </div>
      </main>
    </>
  );
}
