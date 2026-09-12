import Link from "next/link";
import { Topbar } from "@/components/admin/Topbar";
import { LinkRow } from "@/components/admin/LinkRow";
import { Chevron, EmptyRow } from "@/components/admin/ui";
import { gbp, searchCustomers } from "@/lib/mock-data";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const customers = searchCustomers(q);

  return (
    <>
      <Topbar
        title="Customers"
        subtitle={
          q
            ? `${customers.length} match “${q}”`
            : `${customers.length} with a completed order`
        }
        searchPlaceholder="Search customers"
      />

      <main className="min-w-0 flex-1 bg-plane p-5 lg:p-8">
        <div className="min-w-0 overflow-hidden rounded-lg border border-grid bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-[0.8125rem]">
              <thead>
                <tr className="border-b border-grid text-left text-ink-2">
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    City
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Orders
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Lifetime value
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium">
                    Joined
                  </th>
                  <th scope="col" className="w-8 px-4 py-2.5">
                    <span className="sr-only">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <EmptyRow colSpan={6} query={q} />
                ) : (
                  customers.map((customer) => (
                    <LinkRow
                      key={customer.id}
                      href={`/admin/customers/${customer.id}`}
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="font-medium text-ink-1 hover:underline"
                        >
                          {customer.name}
                        </Link>
                        <p className="text-[0.75rem] text-ink-3">
                          {customer.email}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-ink-2">{customer.city}</td>
                      <td className="tnum px-4 py-3 text-right text-ink-2">
                        {customer.orders}
                      </td>
                      <td className="tnum px-4 py-3 text-right font-medium text-ink-1">
                        {gbp.format(customer.lifetimeValue)}
                      </td>
                      <td className="tnum px-4 py-3 text-right text-ink-3">
                        {customer.joinedAt}
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
