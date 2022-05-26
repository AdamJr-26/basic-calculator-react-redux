import { createSlice } from '@reduxjs/toolkit';



export const colorSlice = createSlice({
    name : "color",
    initialState : {
        value : '',
    },
    reducers : {
        changeColor : (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {changeColor} = colorSlice.actions;
export const selectColor = (state) => state.color.value;
export default colorSlice.reducer;