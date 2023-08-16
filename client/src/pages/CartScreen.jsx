import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { cartAction } from "../redux/slice/cart/cartSlice";

function CartScreen() {
  let { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);
  // console.log(cartItems);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  useEffect(() => {
    const data = {
      id: productId,
      qty,
    };
    dispatch(cartAction(data));
  }, [dispatch, productId, qty]);

  return <div>CartScreen</div>;
}

export default CartScreen;
