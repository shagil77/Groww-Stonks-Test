'use server';
 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { CompanyInfo, DailyPrice, GlobalQuote, GraphData, QuoteApiResponse, SearchResult, StockData, StockDataMonthly, StockDataWeekly } from './definitions';
 
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

const UpdateInvoice = InvoiceSchema.omit({ date: true });

const DeleteInvoice = InvoiceSchema.pick({ id: true });

export async function fetchSearchResults(keywords:string):Promise<SearchResult[]> {
  const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const {bestMatches} = await res.json();

    if(!bestMatches) return [];

    const data:SearchResult[] = bestMatches;

    if(!data) return [];

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}
 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(formData: FormData) {
    const { id, customerId, amount, status } = UpdateInvoice.parse({
      id: formData.get('id'),
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(formData: FormData) {
    const { id } = DeleteInvoice.parse({
      id: formData.get('id'),
    });
   
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function fetch30DaysData(symbol:string="IBM"):Promise<GraphData[]> {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const stockData:StockData = await res.json();

    if(!stockData["Time Series (Daily)"]) return [];

    const timeSeries = stockData["Time Series (Daily)"];
    const data:GraphData[] = [];

    for (const date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
          const dailyPrice: DailyPrice = timeSeries[date];
          data.push({date: date, Month: parseFloat(dailyPrice["4. close"])});

          if(data.length===30) break;
          
          // console.log("Date:", date);
          // console.log("Open:", dailyPrice["1. open"]);
          // console.log("High:", dailyPrice["2. high"]);
          // console.log("Low:", dailyPrice["3. low"]);
          // console.log("Close:", dailyPrice["4. close"]);
          // console.log("Volume:", dailyPrice["5. volume"]);
          // console.log("-------------------------");
      }
    }

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function fetch7DaysData(symbol:string="IBM"):Promise<GraphData[]> {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const stockData:StockData = await res.json();

    if(!stockData["Time Series (Daily)"]) return [];

    const timeSeries = stockData["Time Series (Daily)"];
    const data:GraphData[] = [];

    for (const date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
          const dailyPrice: DailyPrice = timeSeries[date];
          data.push({date: date, Week: parseFloat(dailyPrice["4. close"])});

          if(data.length===7) break;
          
          // console.log("Date:", date);
          // console.log("Open:", dailyPrice["1. open"]);
          // console.log("High:", dailyPrice["2. high"]);
          // console.log("Low:", dailyPrice["3. low"]);
          // console.log("Close:", dailyPrice["4. close"]);
          // console.log("Volume:", dailyPrice["5. volume"]);
          // console.log("-------------------------");
      }
    }

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function fetch3MDaysData(symbol:string="IBM"):Promise<GraphData[]> {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const stockData:StockDataWeekly = await res.json();

    if(!stockData["Weekly Time Series"]) return [];

    const timeSeries = stockData["Weekly Time Series"];
    const data:GraphData[] = [];

    for (const date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
          const dailyPrice: DailyPrice = timeSeries[date];
          data.push({date: date, Quarter: parseFloat(dailyPrice["4. close"])});

          if(data.length===12) break;
          
          // console.log("Date:", date);
          // console.log("Open:", dailyPrice["1. open"]);
          // console.log("High:", dailyPrice["2. high"]);
          // console.log("Low:", dailyPrice["3. low"]);
          // console.log("Close:", dailyPrice["4. close"]);
          // console.log("Volume:", dailyPrice["5. volume"]);
          // console.log("-------------------------");
      }
    }

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function fetch6MDaysData(symbol:string="IBM"):Promise<GraphData[]> {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const stockData:StockDataWeekly = await res.json();

    if(!stockData["Weekly Time Series"]) return [];

    const timeSeries = stockData["Weekly Time Series"];
    const data:GraphData[] = [];

    for (const date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
          const dailyPrice: DailyPrice = timeSeries[date];
          data.push({date: date, HalfYear: parseFloat(dailyPrice["4. close"])});

          if(data.length===24) break;
          
          // console.log("Date:", date);
          // console.log("Open:", dailyPrice["1. open"]);
          // console.log("High:", dailyPrice["2. high"]);
          // console.log("Low:", dailyPrice["3. low"]);
          // console.log("Close:", dailyPrice["4. close"]);
          // console.log("Volume:", dailyPrice["5. volume"]);
          // console.log("-------------------------");
      }
    }

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function fetch1YDaysData(symbol:string="IBM"):Promise<GraphData[]> {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const stockData:StockDataMonthly = await res.json();

    if(!stockData["Monthly Time Series"]) return [];

    const timeSeries = stockData["Monthly Time Series"];
    const data:GraphData[] = [];

    for (const date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
          const dailyPrice: DailyPrice = timeSeries[date];
          data.push({date: date, Year: parseFloat(dailyPrice["4. close"])});

          if(data.length===12) break;
          
          // console.log("Date:", date);
          // console.log("Open:", dailyPrice["1. open"]);
          // console.log("High:", dailyPrice["2. high"]);
          // console.log("Low:", dailyPrice["3. low"]);
          // console.log("Close:", dailyPrice["4. close"]);
          // console.log("Volume:", dailyPrice["5. volume"]);
          // console.log("-------------------------");
      }
    }

    return data;
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function getCompanyByTickerSymbol(symbol:string):Promise<CompanyInfo|null> {
  const URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });
    
    const company:CompanyInfo = await res.json();

    return company;
  } catch(error) {
    console.log(error);
    
  }
  return null;
}

export async function getQuoteByTickerSymbol(symbol:string):Promise<GlobalQuote|null> {
  const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 86400
      }
    });

    const data:QuoteApiResponse = await res.json();

    if(!data) return null;

    return data["Global Quote"];
  } catch(error) {
    console.log(error);
  }
  return null;
}

// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
// ) {
//     try {
//       await signIn('credentials', Object.fromEntries(formData));
//     } catch (error) {
//       if ((error as Error).message.includes('CredentialsSignin')) {
//         return 'CredentialSignin';
//       }
//       throw error;
//     }
// }