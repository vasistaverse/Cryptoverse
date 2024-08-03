import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CryptoPlatformCode } from "@/lib/state/cryptoPrice/cryptoPrice";


const initialPlatFormState : CryptoPlatformCode =  "BTC";

const platformSlice = createSlice({
    name: "platform",
    initialState: initialPlatFormState as CryptoPlatformCode,
    reducers: {
        updatePlatForm: (state, action: PayloadAction<CryptoPlatformCode>) => {
            return action.payload
        }
    }
})

// export const platforms : CryptoPlatform[] = ["ETH", "BNB", "SOL", "DOGE", "ADA", "BTC"];
export const {updatePlatForm} = platformSlice.actions;
export default platformSlice.reducer;