import Link from "next/link";
import { Topbar } from "@/components/admin/Topbar";
import { ProductBadge } from "@/components/admin/StatusBadge";
import { LinkRow } from "@/components/admin/LinkRow";
import { Chevron, EmptyRow } from "@/components/admin/ui";
import { gbp, searchProducts } from "@/lib/mock-data";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const products = searchProducts(q);

  return (
    <>
      <Topbar
        title="Products"
        subtitle={
          q
            ? `${products.length} of 8 match “${q}”`
            : `${products.length} in the catalogue`
        }
        searchPlaceholder="Search products"
        action={
          <button
            type="button"
            className="h-8 shrink-0 rounded-md bg-ink-1 px-3 text-[0.8125rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Add product
          </button>
        }
      />

      <main className="min-w-0 flex-1 bg-plane p-5 lg:p-8">
        <div className="min-w-0 overflow-hidden rounded-lg border border-grid bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] text-[0.8125rem]">
              <thead>
                <tr className="border-b border-grid text-left text-ink-2">
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Family
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Concentration
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Updated
                  </th>
                  <th scope="col" className="w-8 px-4 py-2.5">
                    <span className="sr-only">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <EmptyRow colSpan={8} query={q} />
                ) : (
                  products.map((product) => (
                    <LinkRow
                      key={product.id}
                      href={`/admin/products/${product.id}`}
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-medium text-ink-1 hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="font-mono text-[0.75rem] text-ink-3">
                          {product.sku}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-ink-2">{product.family}</td>
                      <td className="px-4 py-3 text-ink-2">
                        {product.concentration}
                        <span className="tnum text-ink-3">
                          {" "}
                          · {product.sizeMl} ml
                        </span>
                      </td>
                      <td className="tnum px-4 py-3 text-right font-medium text-ink-1">
                        {gbp.format(product.price)}
                      </td>
                      <td
                        className={`tnum px-4 py-3 text-right ${
                          product.stock === 0 ? "text-critical" : "text-ink-1"
                        }`}
                      >
                        {product.stock}
                      </td>
                      <td className="px-4 py-3">
                        <ProductBadge status={product.status} />
                      </td>
                      <td className="tnum px-4 py-3 text-right text-ink-3">
                        {product.updatedAt}
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
