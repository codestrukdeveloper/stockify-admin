export interface IKeyIndicators {
  _id?: string;
  period: string;
  rowc?: string;
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
  bookValuePerShare?: string;
  currentSharePrice?: string;
  debtToEquity?: string;
  dividendPerShare?: string;
  dividendPercentOnCMP?: string;
  faceValuePerShare?: string;
  marketCapMillionRs?: string;
  outstandingSharesMillion?: string;
  priceToBook?: string;
  priceToEarning?: string;
  priceToSales?: string;
  returnOnEquity?: string;
  returnOnTotalAssets?: string;
}


export enum KeyIndicators {
  CURRENT_SHARE_PRICE = "CURRENT SHARE PRICE",
  FACE_VALUE_SHARE = "FACE VALUE/SHARE",
  BOOK_VALUE_SHARE = "BOOK VALUE/SHARE",
  PRICE_EARNING = "PRICE TO EARNING (PE)",
  PRICE_SALES = "PRICE/SALES",
  PRICE_BOOK = "PRICE/BOOK",
  OUTSTANDING_SHARES = "OUTSTANDING SHARES (Million)",
  MARKET_CAP = "MARKET CAP (Rs. Million)",
  DEBT_EQUITY = "DEBT/EQUITY",
  DIVIDEND_SHARE = "DIVIDEND/SHARE",
  DIVIDEND_PERCENTAGE = "DIVIDEND % (ON CMP)",
  RETURN_ON_TOTAL_ASSETS = "RETURN ON TOTAL ASSETS",
  RETURN_ON_EQUITY = "RETURN ON EQUITY",
  ROWC = "ROWC"
}