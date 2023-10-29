import Pagination from '@/app/ui/movers/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/movers/table';
import { CreateInvoice } from '@/app/ui/movers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import Tabs from '@/app/ui/movers/tabs';
import TopGainersTable from '@/app/ui/movers/top-gainers-table';
import { fetchTotalPages } from '@/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Top-Gainers',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTotalPages();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Market Movers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
        {/* <CreateInvoice /> */}
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* <Table query={query} currentPage={currentPage} /> */}
        <TopGainersTable query={query} currentPage={currentPage} />
       </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}