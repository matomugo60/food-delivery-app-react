import { fetchUser } from "../Utils/fetchLocalStorageData";

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: [],
};
