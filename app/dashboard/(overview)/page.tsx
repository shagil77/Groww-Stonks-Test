import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, CardSkeleton } from '@/app/ui/skeletons';
import Cards from '@/app/ui/dashboard/cards';
import TopGainers from '@/app/ui/dashboard/top-gainers';
import TopLosers from '@/app/ui/dashboard/top-losers';
 
export default async function Page() {
    
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <TopGainers />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <TopLosers />
        </Suspense>
      </div>
    </main>
  );
}