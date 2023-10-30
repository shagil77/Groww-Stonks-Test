import { ArrowRightIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { fetchTopLosers } from '@/app/lib/data';
import Link from 'next/link';
import { ArrowDownIcon, OfficeBuildingIcon } from '@heroicons/react/solid';
export default async function TopLosers() {
  const topLosers = await fetchTopLosers();

  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Top Losers
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {topLosers.map((company, i) => {
            return (
              <Link key={company.ticker} href={`/company?symbol=${company.ticker}`}>
                <div
                key={company.ticker}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {company.image==='' && <OfficeBuildingIcon width={20} height={20} className='mr-4 rounded-full'/>}
                  {company.image !=='' && <Image
                    src={company.image}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32} alt={company.name} />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {company.name.length > 30 ? `${company.name.slice(0, 30)}...` : company.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {company.ticker}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                    <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base mr-4`}
                    >
                    ${company.price}
                    </p>
                    <ArrowDownIcon color='red' width={16} height={16} rotate={'45deg'} />
                    <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>{Math.round(parseFloat(company.change_percentage))}%</p>
                </div>
              </div>
              </Link>
              
            );
          })}
        </div>
        <Link
            href="/dashboard/movers/top-losers"
            className="flex items-center pb-2 pt-6"
          >
            <h3 className="ml-2 mr-2 text-sm text-gray-500 ">View More</h3>
            <ArrowRightIcon className="h-5 w-5 text-gray-500" />
        </Link>
      </div>
    </div>
  );
}
