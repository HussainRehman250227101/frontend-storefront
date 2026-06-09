import { Button, Card, Image, Text } from "@chakra-ui/react";
import type { product } from "../../features/Products/ProductInterfaces";
import dummy from "../../assets/dummy.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart, getCart, postItemToCart } from "../../features/Cart/CartThunk";
import type { postToCart, itemType } from "../../features/Cart/CartInterfaces";
import type { AppDispatch, RootState } from "../../app/store";
import { selectCartItems } from "../../features/Cart/CartSlice";

interface Props {
  product: product;
}

const ProductCard = ({ product }: Props) => {
  const itemDispatch = useDispatch<AppDispatch>();
  const cartDispatch = useDispatch<AppDispatch>();
  const cart_items = useSelector<RootState>(selectCartItems);
  

  const cart_item = Array.isArray(cart_items)
    ? cart_items.find((item: itemType) => item.product.id === product.id)
    : undefined;

  const addTocart = async (product_id: number) => {
    const data: postToCart = {
      product_id,
      quantity: 1,
    };
    await itemDispatch(postItemToCart(data));
    cartDispatch(getCart());
  };

  const removefromcart = async (item_id: number) => {
  
    await itemDispatch(deleteItemFromCart(item_id));
    cartDispatch(getCart());
  };

  const APIimage = product.images?.[0]?.image?.trim();
  const validImg = APIimage && APIimage.length > 0 ? APIimage : dummy;
  return (
    <div>
      <Card.Root maxW="sm" overflow="hidden">
        <Image
          width={"500px"}
          height={"200px"}
          objectFit={"cover"}
          src={validImg}
          alt="product image"
        />
        <Card.Body gap="2">
          <Card.Title>{product.title}</Card.Title>
          <Card.Description>
            {product.description.length > 100
              ? product.description.slice(0, 100)
              : product.description}
          </Card.Description>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            $ {product.price_with_tax}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          {cart_item ? (
            <Button variant="outline" w={"full"} colorPalette="red"
            onClick={()=>removefromcart(cart_item.id)}>
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="solid"
              w={"full"}
              onClick={() => addTocart(product.id)}
            >
              Add to Cart
            </Button>
          )}
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

export default ProductCard;
