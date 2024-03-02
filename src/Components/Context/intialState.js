import { fetchUser } from "../Utils/fetchLocalStorageData";

// Immediately invoke the function to fetch user data
const userInfo = (async () => await fetchUser())();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: [],
};
