// по лайв кодингу слайсы разделены и объединяются в rootReducer
import { combineReducers } from "redux";
import { ingregientsSlice } from "./ingregientsSlice";

const rootReducer = combineReducers({
    [ingregientsSlice.name]: ingregientsSlice.reducer,
})
export default rootReducer;
