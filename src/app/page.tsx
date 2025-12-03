import { getAccounts, getTransactions } from '@/lib/data';
import { mockCategories } from '@/lib/mock-data';
import { AccountCard } from '@/components/AccountCard';
import { TransactionList } from '@/components/TransactionList';
import { SpendingByCategoryChart } from '@/components/SpendingByCategoryChart';
import { getSpendingByCategory } from '@/lib/utils';
import Link from 'next/link';

export default async function HomePage() {
  // Fetch data on the server
  const accounts = await getAccounts();
  const transactions = await getTransactions();

  // Process data for the chart
  const spendingData = getSpendingByCategory(transactions, mockCategories);

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">My Money Dashboard</h1>
          <Link
            href="/add"
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Add Transaction
          </Link>
        </div>

        {/* Accounts Section - Now takes the full width */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </section>

        {/* Chart Section - Now in its own centered row */}
        <section className="mb-12">
          <SpendingByCategoryChart data={spendingData} />
        </section>

        {/* Transactions Section */}
        <section>
          <TransactionList transactions={transactions} />
        </section>
      </div>
    </main>
  );
}