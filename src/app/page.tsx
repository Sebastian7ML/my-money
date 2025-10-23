import { getAccounts, getTransactions } from '@/lib/data';
import { AccountCard } from '@/components/AccountCard';
import { TransactionList } from '@/components/TransactionList';

export default async function HomePage() {
  // Fetch data on the server before rendering the page
  const accounts = await getAccounts();
  const transactions = await getTransactions();

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">My Money Dashboard</h1>

        {/* Accounts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </section>

        {/* Transactions Section */}
        <section>
          <TransactionList transactions={transactions} />
        </section>
      </div>
    </main>
  );
}