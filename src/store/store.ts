import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CustomizerReducer from "./customizer/CustomizerSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
import BlogReducer from "./apps/blog/BlogSlice";
import AuthReducer from "./apps/auth/AuthSlice";
import SectorReducer from "./apps/sector/SectorSlice";
import IndustryReducer from "./apps/industry/IndustrySlice";
import DepositsReducer from "./apps/deposits/DepositsSlice";
import DhrpsReducer from "./apps/dhrps/DhrpSlice";
import  CompanyReducer from "./apps/company/CompanySlice";




const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    userpostsReducer: UserProfileReducer,
    companyReducer: CompanyReducer,
    blogReducer: BlogReducer,
    industryReducer:IndustryReducer,
    sectorReducer:SectorReducer,
    depositsReducer:DepositsReducer,
    dhrpsReducer:DhrpsReducer,
    authReducer:AuthReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  blogReducer: BlogReducer,
  industryReducer: IndustryReducer,
  authReducer:AuthReducer,
  depositsReducer:DepositsReducer,
  dhrpsReducer:DhrpsReducer,
  sectorReducer:SectorReducer,
  companyReducer: CompanyReducer,

});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
