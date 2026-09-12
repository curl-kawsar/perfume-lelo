import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { OrderBadge } from "@/components/admin/StatusBadge";
import { BackLink, Card, CardHeader, Field } from "@/components/admin/ui";
import {
  gbp,
  getCustomerByEmail,
  getOrderById,
  getProductBySku,
} from "@/lib/mock-data";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  const { detail } = order;
  const customer = getCustomerByEmail(order.email);
  const subtotal = detail.lines.reduce(
    (sum, line) => sum + line.quantity * line.unitPrice,
    0,
  );

  return (
    <>
      <Topbar
        title={order.id}
        subtitle={`Placed ${order.placedAt} by ${order.customer}`}
        action={
          <button
            type="button"
            className="h-8 shrink-0 rounded-md border border-grid bg-surface px-3 text-[0.8125rem] font-medium text-ink-1 transition-colors hover:bg-plane"
          >
            Print invoice
          </button>
        }
      />

      <main className="min-w-0 flex-1 space-y-5 bg-plane p-5 lg:p-8">
        <BackLink href="/admin/orders">All orders</BackLink>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-5">
            <Card>
              <CardHeader
                title="Items"
                meta={`${order.items} ${order.items === 1 ? "item" : "items"}`}
                action={<OrderBadge status={order.status} />}
              />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[30rem] text-[0.8125rem]">
                  <thead>
                    <tr className="border-b border-grid text-left text-ink-2">
                      <th scope="col" className="px-4 py-2 font-medium">
                        Product
                      </th>
                      <th scope="col" className="px-4 py-2 text-right font-medium">
                        Qty
                      </th>
                      <th scope="col" className="px-4 py-2 text-right font-medium">
                        Unit
                      </th>
                      <th scope="col" className="px-4 py-2 text-right font-medium">
                        Line
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.lines.map((line) => {
                      const product = getProductBySku(line.sku);
                      return (
                        <tr
                          key={line.sku}
                          className="border-b border-grid/70 last:border-0"
                        >
                          <td className="px-4 py-3">
                            {product ? (
                              <Link
                                href={`/admin/products/${product.id}`}
                                className="font-medium text-ink-1 hover:underline"
                              >
                                {line.name}
                              </Link>
                            ) : (
                              <span className="font-medium text-ink-1">
                                {line.name}
                              </span>
                            )}
                            <p className="font-mono text-[0.75rem] text-ink-3">
                              {line.sku}
                            </p>
                          </td>
                          <td className="tnum px-4 py-3 text-right text-ink-2">
                            {line.quantity}
                          </td>
                          <td className="tnum px-4 py-3 text-right text-ink-2">
                            {gbp.format(line.unitPrice)}
                          </td>
                          <td className="tnum px-4 py-3 text-right font-medium text-ink-1">
                            {gbp.format(line.quantity * line.unitPrice)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <dl className="space-y-2 border-t border-grid p-4">
                <div className="flex justify-between text-[0.8125rem]">
                  <dt className="text-ink-2">Subtotal</dt>
                  <dd className="tnum text-ink-1">{gbp.format(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-[0.8125rem]">
                  <dt className="text-ink-2">Shipping</dt>
                  <dd className="tnum text-ink-1">
                    {gbp.format(detail.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between text-[0.8125rem]">
                  <dt className="text-ink-2">Tax</dt>
                  <dd className="tnum text-ink-1">{gbp.format(detail.tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-grid pt-2 text-[0.875rem]">
                  <dt className="font-medium text-ink-1">Total</dt>
                  <dd className="tnum font-semibold text-ink-1">
                    {gbp.format(order.total)}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <CardHeader title="History" />
              <ol className="p-4">
                {detail.timeline.map((event, i) => (
                  <li key={event.at + event.label} className="flex gap-3">
                    {/* The rail is drawn per item so the last one stops short. */}
                    <div className="flex flex-col items-center">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rule" />
                      {i < detail.timeline.length - 1 ? (
                        <span className="my-1 w-px flex-1 bg-grid" />
                      ) : null}
                    </div>
                    <div className="pb-4 last:pb-0">
                      <p className="text-[0.8125rem] text-ink-1">
                        {event.label}
                      </p>
                      <p className="tnum text-[0.75rem] text-ink-3">
                        {event.at}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <div className="min-w-0 space-y-5">
            <Card>
              <CardHeader title="Customer" />
              <dl className="space-y-4 p-4">
                <Field label="Name">
                  {customer ? (
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="hover:underline"
                    >
                      {order.customer}
                    </Link>
                  ) : (
                    order.customer
                  )}
                </Field>
                <Field label="Email">
                  <a
                    href={`mailto:${order.email}`}
                    className="hover:underline"
                  >
                    {order.email}
                  </a>
                </Field>
                <Field label="Ships to">
                  <span className="block whitespace-pre-line leading-relaxed">
                    {detail.address.join("\n")}
                  </span>
                </Field>
              </dl>
            </Card>

            <Card>
              <CardHeader title="Fulfilment" />
              <dl className="space-y-4 p-4">
                <Field label="Method">{detail.method}</Field>
                <Field label="Payment">{detail.payment}</Field>
              </dl>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
