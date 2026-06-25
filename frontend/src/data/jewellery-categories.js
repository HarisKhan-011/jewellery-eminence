export const jewelleryCategories = [
  { title: "Rings", slug: "rings" },
  { title: "Necklaces", slug: "necklaces" },
  { title: "Earrings", slug: "earrings" },
  { title: "Bracelets", slug: "bracelets" },
  { title: "Bangles", slug: "bangles" },
  { title: "Anklets", slug: "anklets" },
  { title: "Jewellery Sets", slug: "jewellery-sets" },
  { title: "Diamonds", slug: "diamonds" },
  { title: "Bridal Jewellery", slug: "bridal-jewellery" },
  { title: "Bespoke Atelier", slug: "bespoke-atelier" },
];

export const shopTopCategorySlugs = [
  "rings",
  "necklaces",
  "diamonds",
  "bridal-jewellery",
  "bespoke-atelier",
];

export const shopSidebarCategories = [
  {
    title: "Rings",
    slug: "rings",
    children: [
      { title: "Engagement Rings", slug: "rings" },
      { title: "Wedding Rings", slug: "rings" },
      { title: "Statement Rings", slug: "rings" },
    ],
  },
  {
    title: "Necklaces & Pendants",
    slug: "necklaces",
    children: [
      { title: "Gold Necklaces", slug: "necklaces" },
      { title: "Diamond Necklaces", slug: "necklaces" },
      { title: "Pendants", slug: "necklaces" },
    ],
  },
  {
    title: "Earrings",
    slug: "earrings",
    children: [
      { title: "Stud Earrings", slug: "earrings" },
      { title: "Drop Earrings", slug: "earrings" },
      { title: "Jhumkas", slug: "earrings" },
    ],
  },
  {
    title: "Bracelets & Bangles",
    slug: "bracelets",
    children: [
      { title: "Bracelets", slug: "bracelets" },
      { title: "Bangles", slug: "bangles" },
      { title: "Tennis Bracelets", slug: "bracelets" },
    ],
  },
  {
    title: "Bridal Jewellery",
    slug: "bridal-jewellery",
    children: [
      { title: "Bridal Sets", slug: "bridal-jewellery" },
      { title: "Bridal Necklaces", slug: "bridal-jewellery" },
      { title: "Bridal Earrings", slug: "bridal-jewellery" },
    ],
  },
  {
    title: "Diamonds",
    slug: "diamonds",
    children: [
      { title: "Diamond Rings", slug: "diamonds" },
      { title: "Diamond Necklaces", slug: "diamonds" },
      { title: "Diamond Earrings", slug: "diamonds" },
    ],
  },
  {
    title: "Jewellery Sets",
    slug: "jewellery-sets",
    children: [
      { title: "Gold Sets", slug: "jewellery-sets" },
      { title: "Diamond Sets", slug: "jewellery-sets" },
      { title: "Pearl Sets", slug: "jewellery-sets" },
    ],
  },
  {
    title: "Bespoke Atelier",
    slug: "bespoke-atelier",
    children: [
      { title: "Custom Rings", slug: "bespoke-atelier" },
      { title: "Custom Necklaces", slug: "bespoke-atelier" },
      { title: "Private Consultation", slug: "bespoke-atelier" },
    ],
  },
];

export const slugifyCategory = (value = "") =>
  value.toString().toLowerCase().replace("&", "").trim().split(/\s+/).join("-");

export const metalFinishOptions = [
  { title: "Yellow Gold", slug: "yellow-gold", swatch: "yellow-gold" },
  { title: "White Gold", slug: "white-gold", swatch: "white-gold" },
  { title: "Rose Gold", slug: "rose-gold", swatch: "rose-gold" },
  { title: "Silver", slug: "silver", swatch: "silver" },
  { title: "Platinum", slug: "platinum", swatch: "platinum" },
  { title: "Two-Tone", slug: "two-tone", swatch: "two-tone" },
];

export const gemstoneOptions = [
  { title: "Diamond", slug: "diamond" },
  { title: "Ruby", slug: "ruby" },
  { title: "Emerald", slug: "emerald" },
  { title: "Sapphire", slug: "sapphire" },
  { title: "Pearl", slug: "pearl" },
  { title: "Zircon", slug: "zircon" },
  { title: "Without Gemstone", slug: "without-gemstone" },
];

export const jewelleryPriceRanges = [
  { id: "one", min: 0, max: 25000, label: "Rs. 0 - Rs. 25,000" },
  { id: "two", min: 25001, max: 50000, label: "Rs. 25,001 - Rs. 50,000" },
  { id: "three", min: 50001, max: 100000, label: "Rs. 50,001 - Rs. 100,000" },
  { id: "four", min: 100001, max: 250000, label: "Rs. 100,001 - Rs. 250,000" },
  { id: "five", min: 250001, label: "Rs. 250,001+" },
];

const getStableProductIndex = (product) => {
  const key = `${product?._id || ""}${product?.title || ""}`;
  return key.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
};

export const getProductJewelleryProfile = (product) => {
  const index = getStableProductIndex(product);
  const explicitCategory = [
    product?.children,
    product?.parent,
    product?.category?.name,
    product?.category?.slug,
  ].find((value) =>
    jewelleryCategories.some((category) => category.slug === slugifyCategory(value))
  );

  return {
    category: explicitCategory
      ? slugifyCategory(explicitCategory)
      : jewelleryCategories[index % jewelleryCategories.length].slug,
    metal: slugifyCategory(product?.metal || product?.finish) ||
      metalFinishOptions[index % metalFinishOptions.length].slug,
    gemstone: slugifyCategory(product?.gemstone) ||
      gemstoneOptions[index % gemstoneOptions.length].slug,
  };
};

export const productMatchesJewelleryCategory = (product, categorySlug) => {
  const slug = slugifyCategory(categorySlug);
  const productProfile = getProductJewelleryProfile(product);

  return productProfile.category === slug;
};

export const productMatchesMetal = (product, metalSlug) =>
  getProductJewelleryProfile(product).metal === slugifyCategory(metalSlug);

export const productMatchesGemstone = (product, gemstoneSlug) =>
  getProductJewelleryProfile(product).gemstone === slugifyCategory(gemstoneSlug);
