import React, { useEffect, useState } from "react";
// internal
import SingleProduct from "@components/products/single-product";
import Pagination from "@ui/Pagination";

const ProductGridItems = ({ itemsPerPage, items, setShowingGridItems }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  // side effect
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    if (currentItems && setShowingGridItems) {
      setShowingGridItems(currentItems.length);
    }
  }, [currentItems, setShowingGridItems]);

  // handlePageClick
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="row g-2 g-sm-3 g-lg-4 eminence-product-grid">
        {currentItems &&
          currentItems.map((product, index) => (
            <div
              key={product._id}
              className="col-6 col-md-4 col-xl-3 eminence-product-col"
            >
              <SingleProduct
                product={product}
                imageIndex={itemOffset + index}
              />
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-xxl-12">
          <div className="tp-pagination tp-pagination-style-2">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGridItems;
