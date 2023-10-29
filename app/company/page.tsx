import { Suspense } from "react";
import { lusitana } from "../ui/fonts";
import { CardSkeleton, LatestInvoicesSkeleton } from "../ui/skeletons";
import Cards from "../ui/dashboard/cards";
import TopGainers from "../ui/dashboard/top-gainers";
import TopLosers from "../ui/dashboard/top-losers";
import { ArrowUpCircleIcon, ArrowUpIcon, BuildingOfficeIcon } from "@heroicons/react/20/solid";
import Graph from "../ui/company/graph";

export default async function Page() {
    return (
        <main>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                <div className='grid grid-cols-7 items-center bg-white p-2'>
                    <BuildingOfficeIcon className="md:w-20 md:h-20 sm:w-10 sm:h-10 border col-span-1 rounded-full p-2" />

                    <div className="grid grid-rows-3 col-span-4 items-center">
                        <p className={`${lusitana.className} md:text-xm sm:text-md`}>
                            <b>Company Name</b>
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            CPNN
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            NSQ
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-end">
                        <p className={`${lusitana.className} md:text-xl sm:text-md`}>
                            <b>$ 119.8</b>
                        </p>
                        <div className="flex items-center">
                            <p className={`${lusitana.className} mr-1 md:text-md sm:text-sm text-green-600`}>
                                +0.41%
                            </p>
                            <ArrowUpCircleIcon width={15} height={15} color="green" />
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                <Graph />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                <TopLosers />
                </Suspense>
            </div>
                
            
            
            {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            </div> */}
        </main>
    )
}