import { useRouter, useSearchParams } from "next/navigation";

const PriceItem = ({ id, min, max, label }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceMin = searchParams.get("priceMin");
  const activeMax = searchParams.get("max");
  const priceMax = searchParams.get("priceMax");
  const isActive =
    priceMin === `${min}` && (max ? activeMax === `${max}` : !activeMax);

  const handlePrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceMin");
    params.delete("priceMax");
    params.delete("max");

    if (!isActive) {
      params.set("priceMin", `${min}`);
      if (max) {
        params.set("max", `${max}`);
      }
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `/shop?${nextQuery}` : "/shop");
  };

  return (
    <div className="shop__widget-list-item">
      <input
        onChange={handlePrice}
        type="checkbox"
        id={`price-${id}`}
        checked={isActive || priceMax === `${min}`}
      />
      <label htmlFor={`price-${id}`} className="jewellery-filter-label">
        {label}
      </label>
    </div>
  );
};

export default PriceItem;
