import { getCart } from "../features/Cart/CartThunk";
import { fetchProducts } from "../features/Products/productThunk";
import { store } from "./store";

export const appinitialize = async () => {
  await store.dispatch(fetchProducts());

  const action = await store.dispatch(getCart());
  
  if (getCart.fulfilled.match(action)) {
    localStorage.setItem("cart",action.payload.id);
  } else {
    throw new Error("cart creation failed! ");
  }
};
