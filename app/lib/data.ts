import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CompanyInfo,
  MoverCompany,
  Mover,
  TopGainersLosers,
  SearchResult,
  StockData,
  DailyPrice,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import RedisHandler from './redis';
import axios from 'axios';

const redis = RedisHandler.getRedisInstance();



const getCompanyNameByTickerSymbol = async(symbol:string) => {

  try {
    const companyName = await redis.get(symbol);
    if(companyName) return companyName as string;

    return '...';
  } catch(error) {
    console.log(error);
    return '...';
  }

}

export const fetchTopGainers = async():Promise<MoverCompany[]> => {
  const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:TopGainersLosers = await res.json();

    if(!data) return [];

    if(!data.top_gainers) return [];

    const topGainers = [];

    for(let i=0; i<Math.min(data.top_gainers.length, 5); i++) {
      topGainers.push({
        image: '',
        name: await getCompanyNameByTickerSymbol(data.top_gainers[i].ticker)!,
        ...data.top_gainers[i]
      })
    }

    return topGainers;

  } catch(error) {
    console.log(error);
  }

  return [];
}

export const fetchTopLosers = async():Promise<MoverCompany[]> => {
  const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:TopGainersLosers = await res.json();

    if(!data) return [];

    if(!data.top_losers) return [];

    const topLosers = [];

    for(let i=0; i<Math.min(data.top_losers.length, 5); i++) {
      topLosers.push({
        image: '',
        name: await getCompanyNameByTickerSymbol(data.top_losers[i].ticker)!,
        ...data.top_losers[i]
      })
    }

    return topLosers;

  } catch(error) {
    console.log(error);
  }

  return [];
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTopGainers(currentPage: number) {
  const offset = (currentPage-1)*ITEMS_PER_PAGE;

  const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:TopGainersLosers = await res.json();

    if(!data) return [];

    if(!data.top_gainers) return [];

    const topGainers = [];

    for(let i=offset; i<Math.min(data.top_gainers.length, offset+6); i++) {
      topGainers.push({
        image: '',
        name: await getCompanyNameByTickerSymbol(data.top_gainers[i].ticker)!,
        ...data.top_gainers[i]
      })
    }

    return topGainers;

  } catch(error) {
    console.log(error);
  }

  return [];
}
export async function fetchFilteredTopLosers(currentPage: number) {
  const offset = (currentPage-1)*ITEMS_PER_PAGE;

  const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:TopGainersLosers = await res.json();

    if(!data) return [];

    if(!data.top_losers) return [];

    const topLosers = [];

    for(let i=offset; i<Math.min(data.top_losers.length, offset+6); i++) {
      topLosers.push({
        image: '',
        name: await getCompanyNameByTickerSymbol(data.top_losers[i].ticker)!,
        ...data.top_losers[i]
      })
    }

    return topLosers;

  } catch(error) {
    console.log(error);
  }

  return [];
}

export async function fetchTotalPages() {

  const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:TopGainersLosers = await res.json();

    if(!data) return 0;

    if(!data.top_losers || !data.top_gainers) return 0;

    if(data.top_gainers.length !== data.top_losers.length) return 0;

    return Math.ceil(data.top_gainers.length/ITEMS_PER_PAGE);

  } catch(error) {
    console.log(error);
  }

  return 0;
}



