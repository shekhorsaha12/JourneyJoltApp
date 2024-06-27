import "./ReviewItem.css";

const ReviewItem = ({ review }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((star, index) => {
            return (
                <span
                    key={index}
                    className={index < rating ? "star filled" : "star"}
                >
                    ★
                </span>
            );
        });
    };

    return (
        <div className="review-item">
            {/* <img
                src={review.profilePicture}
                alt={`${review.reviewer}'s profile`}
                className="profile-picture"
            /> */}
            <img
                src="/img/avatar.png"
                className="avatar img-fluid rounded me-1 profile-picture"
                alt={`${
                    review?.reviewer?.first_name || review?.reviewer?.email
                }'s profile`}
            />
            <div className="review-content">
                <h3>
                    {review?.reviewer?.first_name
                        ? `${review?.reviewer?.first_name} ${review?.reviewer?.last_name}`
                        : review?.reviewer?.email}
                </h3>
                <div className="rating">{renderStars(review.rating)}</div>
                <p>{review?.review_text}</p>
            </div>
        </div>
    );
};

export default ReviewItem;
