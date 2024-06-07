import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";
import axios from "axios";
import { API_URL } from "../../constants";
import { Spinner } from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";

const ReviewList = ({ placeId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(undefined);
    const [reloadCounter, setReloadCounter] = useState(1);

    useEffect(() => {
        axios.get(API_URL + "places/" + placeId + "/reviews/").then((res) => {
            setReviews(res.data);
            setLoading(false);
        });
    }, [placeId, reloadCounter]);

    const onPostReview = () => {
        if (!rating) {
            alert("Please rate this place between 1 - 5");
            return;
        }
        if (!reviewText || reviewText.trim().length === 0) {
            alert("Please enter ome valid review details");
            return;
        }
        const formData = new FormData();
        formData.append("rating", rating);
        formData.append("review_text", reviewText);
        axios
            .post(API_URL + "places/" + placeId + "/reviews/add/", formData)
            .then((res) => {
                setReloadCounter(reloadCounter + 1);
                setRating(undefined);
                setReviewText("");
            });
    };

    if (loading) {
        return <Spinner animation="grow" />;
    }

    const averageRating =
        reviews.length > 0
            ? (
                  reviews
                      .map((review) => review.rating)
                      .reduce((prevVal, currVal) => prevVal + currVal) /
                  reviews.length
              ).toFixed(2)
            : undefined;

    return (
        <div className="review-list">
            {reviews.length > 0 ? (
                <div className="review-summary">
                    Total Review: {reviews.length} <br />
                    Average Rating: {averageRating}
                </div>
            ) : (
                <></>
            )}

            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                reviews.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                ))
            )}
            <br />
            <hr />
            <br />
            <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
            />

            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Thoughts on this page?"
                className="text-input"
                required
            />

            <button className="btn btn-info btn-md" onClick={onPostReview}>
                Post New Review
            </button>
        </div>
    );
};

export default ReviewList;
