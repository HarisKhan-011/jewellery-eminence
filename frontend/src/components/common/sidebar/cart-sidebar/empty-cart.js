import React from "react";
import Link from "next/link";

const EmptyCart = ({ search_prd = false }) => {
  return (
    <div className="cartmini__empty text-center">
      <p>{search_prd ? `Sorry,😥 we can not find this product` : `Your Cart is empty`}</p>
      {!search_prd && (
        <Link href="/shop" className="tp-btn">
          Go to Shop
        </Link>
      )}
    </div>
  );
};

export default EmptyCart;
