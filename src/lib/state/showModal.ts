import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialShowModalState : boolean = false;

const showModalSlice = createSlice({
    name: "showModal",
    initialState: initialShowModalState as boolean,
    reducers: {
        updateShowModal: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
})

export const {updateShowModal} = showModalSlice.actions;
export default showModalSlice.reducer;