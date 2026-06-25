// RatingFull
export function RatingFull() {
  return (
    <span>
      <i className="icon_star"></i>
    </span>
  );
}
// RatingHalf
export function RatingHalf() {
  return (
    <span>
      <i className="icon_star_alt"></i>
    </span>
  );
}

export function ProductRating({ rating = 0, className = "" }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));

  if (!value) return null;

  return (
    <div className={`product__rating d-flex ${className}`.trim()}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;

        if (value >= starValue) {
          return <RatingFull key={index} />;
        }

        return <RatingHalf key={index} />;
      })}
    </div>
  );
}
