import InvoiceStatus from '@/app/ui/movers/status';
import { fetchFilteredTopLosers } from '@/app/lib/data';
import Link from 'next/link';
import { ArrowRightIcon, OfficeBuildingIcon } from '@heroicons/react/solid';

export default async function TopLosersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const topLosers = await fetchFilteredTopLosers(currentPage);

  // className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page"
  // className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"

  return (
    <div className='w-full'>
        <div>
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <div className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <Link
                            key={"Top Gainers"}
                            href={'/dashboard/movers/top-gainers'}
                        >
                            Top Gainers
                        </Link>
                        
                    </div>
                </li>
                <li className="mr-2">
                    <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                        <Link
                            key={"Top Losers"}
                            href={'/dashboard/movers/top-losers'}
                        >
                            Top Losers
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                    {topLosers?.map((loser) => (
                    <div
                        key={loser.ticker}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <div className="mb-2 flex items-center">
                                <OfficeBuildingIcon width={20} height={20} />
                            {/* <Image
                                src={invoice.image_url}
                                className="mr-2 rounded-full"
                                width={28}
                                height={28}
                                alt={`${invoice.name}'s profile picture`}
                            /> */}
                            <p>{loser.name}</p>
                            </div>
                            <p className="text-sm text-gray-500">{loser.ticker}</p>
                        </div>
                        <InvoiceStatus status={loser.change_percentage} />
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                        <div>
                            <p className="text-xl font-medium">
                            ${loser.price}
                            </p>
                            <p>{loser.change_amount}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                        <Link key={loser.ticker} href={`/company?symbol=${loser.ticker}`}>
                                <ArrowRightIcon width={15} height={15} />
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                    <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Company
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Symbol
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Price
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Change Amount
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Change %
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">CTA</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {topLosers?.map((loser) => (
                        <tr
                        key={loser.ticker}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                <OfficeBuildingIcon width={20} height={20} />
                            {/* <Image
                                src={loser.image_url}
                                className="rounded-full"
                                width={28}
                                height={28}
                                alt={`${invoice.name}'s profile picture`}
                            /> */}
                            <p>{loser.name}</p>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {loser.ticker}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            ${loser.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {loser.change_amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <InvoiceStatus status={loser.change_percentage} />
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                            <Link key={loser.ticker} href={`/company?symbol=${loser.ticker}`}>
                                <ArrowRightIcon width={15} height={15} />
                            </Link>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    
  );
}
