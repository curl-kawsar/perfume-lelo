import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { ProductBadge } from "@/components/admin/StatusBadge";
import { BackLink, Card, CardHeader, Field } from "@/components/admin/ui";
import { getProductById, gbp } from "@/lib/mock-data";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const { detail } = product;
  const margin = product.price - detail.costPrice;
  const marginPct = Math.round((margin / product.price) * 100);

  return (
    <>
      <Topbar
        title={product.name}
        subtitle={product.sku}
        action={
          <button
            type="button"
            className="h-8 shrink-0 rounded-md bg-ink-1 px-3 text-[0.8125rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Edit product
          </button>
        }
      />

      <main className="min-w-0 flex-1 space-y-5 bg-plane p-5 lg:p-8">
        <BackLink href="/admin/products">All products</BackLink>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-5">
            <Card>
              <CardHeader
                title="Composition"
                meta={`By ${detail.perfumer}`}
                action={<ProductBadge status={product.status} />}
              />
              <div className="p-4">
                <p className="max-w-[62ch] text-[0.875rem] leading-relaxed text-ink-2">
                  {detail.description}
                </p>

                <dl className="mt-5 space-y-2 border-t border-grid pt-4">
                  {detail.notes.map((note) => (
                    <div key={note.stage} className="flex gap-4 text-[0.8125rem]">
                      <dt className="w-14 shrink-0 text-ink-3">{note.stage}</dt>
                      <dd className="text-ink-1">{note.accord}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card>

            <Card>
              <CardHeader title="Catalogue" />
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 p-4 sm:grid-cols-3">
                <Field label="Family">{product.family}</Field>
                <Field label="Concentration">{product.concentration}</Field>
                <Field label="Size">
                  <span className="tnum">{product.sizeMl} ml</span>
                </Field>
                <Field label="Launched">
                  <span className="tnum">{detail.launchedAt}</span>
                </Field>
                <Field label="Last updated">
                  <span className="tnum">{product.updatedAt}</span>
                </Field>
                <Field label="Returns">
                  <span className="tnum">{detail.returnsPct}%</span>
                </Field>
              </dl>
            </Card>
          </div>

          <div className="min-w-0 space-y-5">
            <Card>
              <CardHeader title="Pricing" />
              <dl className="space-y-3 p-4">
                <div className="flex items-baseline justify-between">
                  <dt className="text-[0.8125rem] text-ink-2">Retail</dt>
                  <dd className="tnum text-[1.25rem] font-semibold text-ink-1">
                    {gbp.format(product.price)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-grid pt-3">
                  <dt className="text-[0.8125rem] text-ink-2">Unit cost</dt>
                  <dd className="tnum text-[0.8125rem] text-ink-1">
                    {gbp.format(detail.costPrice)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-[0.8125rem] text-ink-2">Margin</dt>
                  <dd className="tnum text-[0.8125rem] font-medium text-ink-1">
                    {gbp.format(margin)}{" "}
                    <span className="font-normal text-ink-3">({marginPct}%)</span>
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <CardHeader title="Inventory" />
              <div className="p-4">
                <p
                  className={`tnum text-[1.75rem] font-semibold leading-none tracking-[-0.02em] ${
                    product.stock === 0 ? "text-critical" : "text-ink-1"
                  }`}
                >
                  {product.stock}
                </p>
                <p className="mt-2 text-[0.75rem] text-ink-3">
                  {product.stock === 0
                    ? "Out of stock. Orders cannot be placed."
                    : `Units on hand · ${detail.unitsSold.toLocaleString("en-GB")} sold to date`}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
