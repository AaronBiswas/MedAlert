import React from "react";

function ReusableCard({ title, description, buttonLabel = "Click", onButtonClick }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        {onButtonClick && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onButtonClick}>
              {buttonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReusableCard;
