import React from "react";

function Rating({ rating: rating_string, text }) {
  const rating = parseFloat(rating_string);


  return (
    <div className="">
      {rating === 0
        ? [0, 0, 0, 0, 0].map(() => (
            <i
              style={{ color: "#FFFF00" }}
              className="far fa-star"
              aria-hidden="true"
            ></i>
          ))
        : rating % parseInt(rating) === 0
        ? Array(rating)
            .fill()
            .map(() => (
              <i style={{ color: "#FFFF00" }} className="fas fa-star"></i>
            ))
        : Array(rating - 0.5)
            .fill()
            .map(() => (
              <i style={{ color: "#FFFF00" }} className="fas fa-star"></i>
            ))}
      {rating % parseInt(rating) !== 0 && rating !== 0 && (
        <i style={{ color: "#FFFF00" }} className="fas fa-star-half-alt"></i>
      )}
        {rating % parseInt(rating) === 0 && (
          Array(5-rating)
          .fill().map(()=> <i style={{ color: "#FFFF00" }} className="far fa-star"></i>)
      )}
      <span>{text}</span>
    </div>
  );
}

export default Rating;
