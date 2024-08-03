export interface Delta {
  hour: number;
  day: number;
  week: number;
  month?: number;
  quarter?: number;
  year?: number;
}

export interface CryptoData {
  name: string;
  rank: number;
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  code: string;
  rate: number;
  volume: number;
  cap: number;
  symbol?: string;
  delta: Delta;
}

export interface CryptoPlatform {
  code: "ETH" | "BNB" | "SOL" | "DOGE" | "BTC";
}
