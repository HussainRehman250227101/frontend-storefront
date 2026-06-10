import { getCart } from "../features/Cart/CartThunk";
import { store } from "./store";

export const appinitialize = async () => {
  const action = await store.dispatch(getCart());
  
  if (getCart.fulfilled.match(action)) {
    localStorage.setItem("cart",action.payload.id);
  } else {
    throw new Error("cart creation failed! ");
  }
};
