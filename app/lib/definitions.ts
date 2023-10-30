// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { ForwardRefExoticComponent, ReactNode, RefAttributes, SVGProps } from "react";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type MoverCompany = {
  image:string;
  name:string;
  ticker:string;
  price:string;
  change_amount:string;
  change_percentage:string;
  volume:string;
};

export type Mover = {
  ticker:string;
  price:string;
  change_amount:string;
  change_percentage:string;
  volume:string;
};

export type TopGainersLosers = {
  top_gainers: Mover[];
  top_losers: Mover[];
};

export type LinkItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>>;
};

export type CompanyInfo = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  '52WeekHigh': string;
  '52WeekLow': string;
  '50DayMovingAverage': string;
  '200DayMovingAverage': string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
};


export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type SearchResult = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};

export type DailyPrice = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

export type TimeSeries = {
  [date: string]: DailyPrice;
};

export type StockData = {
  "Meta Data": {
      "1. Information": string;
      "2. Symbol": string;
      "3. Last Refreshed": string;
      "4. Output Size": string;
      "5. Time Zone": string;
  };
  "Time Series (Daily)": TimeSeries;
};

export type StockDataWeekly = {
  "Meta Data": {
      "1. Information": string;
      "2. Symbol": string;
      "3. Last Refreshed": string;
      "4. Output Size": string;
      "5. Time Zone": string;
  };
  "Weekly Time Series": TimeSeries;
};

export type StockDataMonthly = {
  "Meta Data": {
      "1. Information": string;
      "2. Symbol": string;
      "3. Last Refreshed": string;
      "4. Output Size": string;
      "5. Time Zone": string;
  };
  "Monthly Time Series": TimeSeries;
};

export type GlobalQuote = {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
};

export type QuoteApiResponse = {
  "Global Quote": GlobalQuote;
};


// Monthly Time Series

// export type GraphData = {
//   date:string;
//   value:number;
// };

export type GraphData = {
  date:string;
  Week?: number;
  Month?: number;
  Quarter?: number,
  HalfYear?: number,
  Year?: number,
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
