import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleCategory = ({ item }) => {
  return (
    <div className="product__category-item mb-20 text-center">
      <Link href={item.href} className="product__category-link">
        <div className="product__category-thumb w-img">
          <Image
            src={item.img}
            alt={item.title}
            width={272}
            height={181}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="product__category-content">
          <h3 className="product__category-title">{item.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default SingleCategory;
