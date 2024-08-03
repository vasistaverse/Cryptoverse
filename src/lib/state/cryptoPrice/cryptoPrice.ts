import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CryptoPlatform, CryptoData } from "@/interfaces/prices";
import sortedCryptos from "@/utils/enqueueWithLimit";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { RootState } from "@/lib/store";

export type CryptoPriceStates = {
  [K in CryptoPlatform["code"]]: CryptoData[];
};

interface FetchLatestPricesArgs {
  fiat: string;
  code: CryptoPlatformCode;
}
export type CryptoPlatformCode  = keyof CryptoPriceStates

const initialState: { cryptos: CryptoPriceStates; isLoading: boolean; isError: boolean, isSuccess: boolean, selectedData: CryptoData[], selectedCode: CryptoPlatformCode } = {
  cryptos: {
    ETH: [],
    BNB: [],
    SOL: [],
    DOGE: [],
    BTC: [],
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  selectedData: [],
  selectedCode: "BTC"
};

export const fetchLatestPrices = createAsyncThunk<any, FetchLatestPricesArgs>("cryptoPrice/fetchLatestPrices", async ({fiat, code }: FetchLatestPricesArgs) => {
  try {
    const response = await axios.post(
      `https://api.livecoinwatch.com/coins/map`,
      {
        currency: fiat,
        codes: ["ETH", "BNB", "BTC", "DOGE", "SOL"],
        sort: "rank",
        order: "ascending",
        meta: true,
      },
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_COIN_WATCH_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("posting to db")
    const response_2 = await axios.post('/api', {coins: response.data, currancy: fiat, code: code })
    return response_2.data;
  } catch (err) {
    throw err;
  }
});

const cryptoPriceSlice = createSlice({
  name: "cryptoPrice",
  initialState: initialState,
  reducers: {
    getSelectedData: (state, action: PayloadAction<CryptoData[]>) => {
      state.selectedData = action.payload
    },
    updatedSelectedCode: (state, action: PayloadAction<CryptoPlatformCode>) => {
      state.selectedCode = action.payload
      state.selectedData = state.cryptos[action.payload]
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLatestPrices.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchLatestPrices.fulfilled, (state, action: PayloadAction<any>) => {
        const newCryptos = sortedCryptos(action.payload.data);
        state.cryptos = newCryptos
        state.selectedData = state.cryptos[state.selectedCode]
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchLatestPrices.rejected, (state) => {
        console.log("rejected");
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { getSelectedData, updatedSelectedCode } = cryptoPriceSlice.actions;

export default cryptoPriceSlice.reducer;
