import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDiscountedPkrPrice } from "@utils/format-price";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const { cart_products } = useSelector((state) => state.cart);

    useEffect(() => {
        const cart = cart_products.reduce((cartTotal, cartItem) => {
        const { originalPrice, orderQuantity, discount } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          const itemTotal =
            getDiscountedPkrPrice(originalPrice, discount) * orderQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += orderQuantity;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      })
        setQuantity(cart.quantity);
        setTotal(cart.total);
    }, [cart_products])
    return {
        quantity,
        total,
        setTotal,
    }
}

export default useCartInfo;
