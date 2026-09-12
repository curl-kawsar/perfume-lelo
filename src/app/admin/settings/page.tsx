import { Topbar } from "@/components/admin/Topbar";

const fields = [
  { label: "Store name", value: "Demo", hint: "Shown in the storefront header and on receipts." },
  { label: "Support email", value: "care@demo.com", hint: "Where order replies are delivered." },
  { label: "Currency", value: "Pound sterling (GBP)", hint: "All prices and reports use this currency." },
  { label: "Ships from", value: "Grasse, France", hint: "Sets the default origin for shipping rates." },
];

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Store details" />

      <main className="min-w-0 flex-1 bg-plane p-5 lg:p-8">
        <div className="max-w-2xl rounded-lg border border-grid bg-surface">
          <div className="border-b border-grid px-4 py-3">
            <h2 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">Store details</h2>
            <p className="text-[0.75rem] text-ink-3">These values are mock data until the backend is connected.</p>
          </div>

          <dl className="divide-y divide-grid/70">
            {fields.map((field) => (
              <div key={field.label} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-[0.8125rem] font-medium text-ink-1">{field.label}</dt>
                <dd>
                  <p className="text-[0.8125rem] text-ink-1">{field.value}</p>
                  <p className="text-[0.75rem] text-ink-3">{field.hint}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </>
  );
}
