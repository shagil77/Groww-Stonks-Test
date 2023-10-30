"use client";
import { Suspense, useEffect, useState } from "react";
import { lusitana } from "../ui/fonts";
import { LatestInvoicesSkeleton } from "../ui/skeletons";
import { ArrowCircleUpIcon, ArrowUpIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import Graph from "../ui/company/graph";
import { useSearchParams } from "next/navigation";
import { CompanyInfo, GlobalQuote } from "../lib/definitions";
import { getCompanyByTickerSymbol, getQuoteByTickerSymbol } from "../lib/actions";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";

export default function Page() {
    const searchParams = useSearchParams();
    const companySymbol = searchParams.get('symbol');
    if(!companySymbol) return null;
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo|null>(null);
    const [companyQuote, setCompanyQuote] = useState<GlobalQuote|null>(null);

    useEffect(()=>{
        const getCompanyInfo = async() => {
            const res = await getCompanyByTickerSymbol(companySymbol);
            setCompanyInfo(res);
        }
        const getCompanyQuote = async() => {
            const res = await getQuoteByTickerSymbol(companySymbol);
            setCompanyQuote(res);
        }
        if(companySymbol) {
            getCompanyInfo();
            getCompanyQuote();
        }
    }, [companySymbol]);

    return (
        <main>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                <div className='grid grid-cols-7 items-center bg-white p-2'>
                    <OfficeBuildingIcon className="md:w-20 md:h-20 sm:w-10 sm:h-10 border col-span-1 rounded-full p-2" />

                    <div className="grid grid-rows-3 col-span-4 items-center">
                        <p className={`${lusitana.className} md:text-xm sm:text-md`}>
                            <b>{companyInfo?.Name}</b>
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.Symbol}
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.Exchange}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-end">
                        <p className={`${lusitana.className} md:text-xl sm:text-md`}>
                            <b>${ }{companyQuote?.["05. price"]}</b>
                        </p>
                        <div className="flex items-center">
                            {companyQuote?.["10. change percent"].startsWith("-") && <p className={`${lusitana.className} mr-1 md:text-md sm:text-sm text-red-600`}>
                                    {companyQuote?.["10. change percent"]}
                                </p>
                            }
                            {companyQuote?.["10. change percent"].startsWith("-") && 
                                <ArrowCircleDownIcon width={15} height={15} color="red" />
                            }
                            {!companyQuote?.["10. change percent"].startsWith("-") && <p className={`${lusitana.className} mr-1 md:text-md sm:text-sm text-green-600`}>
                                {companyQuote?.["10. change percent"]}
                            </p>
                            }
                            {!companyQuote?.["10. change percent"].startsWith("-") && 
                                <ArrowCircleUpIcon width={15} height={15} color="green" />
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="rounded-xl bg-gray-50 mt-4 p-2 shadow-sm">
                <div className='grid grid-cols-5 items-center bg-white p-2'>
                    
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        PE-Ratio
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.PERatio}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        EBITDA
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.EBITDA}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        PEG-Ratio
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.PEGRatio}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        BookValue
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.BookValue}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        EPS
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.EPS}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-gray-50 mt-4 p-2 shadow-sm">
                <div className='grid grid-cols-5 items-center bg-white p-2'>
                    
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        52-Week High
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.["52WeekHigh"]}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        52-Week Low
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.["52WeekLow"]}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        Dividend Per Share
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.DividendPerShare}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        Sector
                        </p>
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                            {companyInfo?.Sector}
                        </p>
                    </div>
                    <div className="grid grid-rows-2 justify-items-center col-span-1">
                        <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                        Industry
                        </p>
                        <p className={`${lusitana.className} md:text-sm sm:text-sm`}>
                            {companyInfo?.Industry}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <Graph />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
                        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                            Company Info
                        </h2>
                        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                            {/* NOTE: comment in this code when you get to this point in the course */}

                            <div className="bg-white px-6">
                                <p className={`${lusitana.className} md:text-md sm:text-sm`}>
                                    {companyInfo?.Description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
            

            {/* 
    "52WeekHigh": "151.93",
    "52WeekLow": "118.71",
    "DividendPerShare": "6.62",
    "DividendYield": "0.0466" */}
                
            
            
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