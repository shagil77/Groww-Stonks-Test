import Link from "next/link";

export default async function Tabs() {
    return (

        <div>
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <div className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <Link
                            key={"Top Gainers"}
                            href={'/dashboard/invoices/top-gainers'}
                        >
                            Top Gainers
                        </Link>
                        
                    </div>
                </li>
                <li className="mr-2">
                    <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                        <Link
                            key={"Top Losers"}
                            href={'/dashboard/invoices/top-losers'}
                        >
                            Top Losers
                        </Link>
                    </div>
                </li>
            </ul>
        </div>

    );
}