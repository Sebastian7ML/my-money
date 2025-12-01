import { getTransaction } from '@/lib/data';
import { notFound } from 'next/navigation';
import { EditTransactionForm } from '@/components/EditTransactionForm';
import Link from 'next/link';

interface EditTransactionPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
  // `params` may be a Promise in some Next.js versions; unwrap it safely
  const resolved = (await params) as { id: string };
  const id = resolved.id;
  const transaction = await getTransaction(id);

  if (!transaction) {
    notFound();
  }
  
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Edit Transaction</h1>
          <Link
            href="/"
            className="text-sky-600 hover:text-sky-800 font-medium"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <EditTransactionForm transaction={transaction} />
        </div>
      </div>
    </main>
  );
}
