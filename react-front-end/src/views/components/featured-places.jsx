import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const FeaturedPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL + "places/featured/").then((res) => {
            setPlaces(res.data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <h1 className="h3 mb-3">
                <strong>Featured Places</strong>
            </h1>

            {loading || !places ? (
                <Spinner animation="grow" />
            ) : (
                places.map((place) => {
                    return (
                        <div className="card" key={place.id}>
                            <img
                                className="card-img-top"
                                src={
                                    place.image
                                        ? place.image
                                        : "/img/places/p3.webp"
                                }
                                alt={place.name}
                                style={{ height: "180px", objectFit: "cover" }}
                            />
                            <div className="card-header">
                                <h5 className="card-title mb-0 pb-0">
                                    {place.title}
                                </h5>
                            </div>
                            <div className="card-body pt-1">
                                <p className="text-muted">{place.name}</p>

                                <div className="jj-actions">
                                    <Link
                                        to={"/places/" + place.id}
                                        className="card-link"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default FeaturedPlaces;
