'use client';

import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// internal
import ErrorMessage from "@components/error-message/error";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  review: Yup.string().required().min(10).label("Review"),
});

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="product-review-input">
            <input
              {...register("name", { required: "Name is required!" })}
              name="name"
              type="text"
              placeholder="Your name"
            />
            <ErrorMessage message={errors.name?.message} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-review-input">
            <input
              {...register("email", { required: "Email is required!" })}
              name="email"
              type="email"
              placeholder="Your email"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="product-review-input is-textarea">
            <textarea
              {...register("review", { required: "Review is required!" })}
              name="review"
              placeholder="Write your review"
            ></textarea>
            <ErrorMessage message={errors.review?.message} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="product-review-agree d-flex align-items-start mb-25">
            <input className="e-check-input" type="checkbox" id="review-agree" />
            <label className="e-check-label" htmlFor="review-agree">
              Save my name and email for the next time I review a product.
            </label>
          </div>
        </div>
        <div className="col-md-12">
          <button type="submit" className="tp-btn">
            Submit Review
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
