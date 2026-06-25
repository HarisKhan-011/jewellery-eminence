const getImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;

  return (
    image.url ||
    image.src ||
    image.image ||
    image.secure_url ||
    image.path ||
    ""
  );
};

export const publicProductImages = [
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 10_45_44 PM.png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_48 PM (1).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_49 PM (2).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_49 PM (3).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_50 PM (4).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_50 PM (5).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_51 PM (6).png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_10_22 PM.png",
  "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_11_02 PM.png",
  "/assets/img/eminence/products/ChatGPT Image Jun 9, 2026, 01_23_31 AM.png",
  "/assets/img/eminence/products/anja.png",
  "/assets/img/eminence/products/eminence-earrings.png",
];

export const getPublicProductImage = (index = 0) => {
  const normalizedIndex = Math.abs(Number(index) || 0) % publicProductImages.length;
  return publicProductImages[normalizedIndex];
};

const pushUniqueImage = (images, image) => {
  const url = getImageUrl(image);

  if (url && !images.includes(url)) {
    images.push(url);
  }
};

export const getProductImages = (product = {}) => {
  const images = [];

  pushUniqueImage(images, product.image);
  pushUniqueImage(images, product.img);
  pushUniqueImage(images, product.thumbnail);

  if (Array.isArray(product.images)) {
    product.images.forEach((image) => pushUniqueImage(images, image));
  }

  if (Array.isArray(product.relatedImages)) {
    product.relatedImages.forEach((image) => pushUniqueImage(images, image));
  }

  return images;
};

export const getProductPrimaryImage = (product = {}) =>
  getProductImages(product)[0] || "";

export const getProductHoverImage = (product = {}) =>
  getProductImages(product)[1] || "";

export const getProductImageAlt = (product = {}) =>
  product.title ? `${product.title} product image` : "Product image";

export const getProductCategoryName = (product = {}) =>
  product.category?.name || product.parent || product.children || "";

export const getProductRatingValue = (product = {}) => {
  const rating =
    product.rating ??
    product.averageRating ??
    product.ratingValue ??
    product.reviews?.average;

  return Math.max(0, Math.min(5, Number(rating) || 0));
};
