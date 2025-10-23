import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">My Money Dashboard</h1>

        {/* Accounts Section Skeleton */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-md border border-slate-200">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            ))}
          </div>
        </section>

        {/* Transactions Section Skeleton */}
        <section>
          <div className="bg-white rounded-lg shadow-md border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <Skeleton className="h-6 w-40" />
            </div>
            <ul>
              {[...Array(5)].map((_, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-4 border-b border-slate-100 last:border-b-0"
                >
                  <div>
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}