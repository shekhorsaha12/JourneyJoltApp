import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BASE_URL } from "../constants";
import { Spinner } from "react-bootstrap";
import ReviewList from "../components/RatingReviewComponents/ReviewList";

const PlaceDetails = () => {
    const { placeId } = useParams();

    const [place, setPlace] = useState();
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(API_URL + "places/" + placeId + "/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setPlace(res.data.data);
                setTags(res.data.data.tags.split(",").map((tag) => tag.trim()));
                setLoading(false);
            });
    }, [placeId]);

    if (loading || !place) {
        return <Spinner animation="grow" />;
    }

    const mapSrc = `https://maps.google.com/maps?width=520&height=400&hl=en&q=${encodeURIComponent(
        place.name,
    )}&t=&z=12&ie=UTF8&iwloc=B&output=embed`;

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 className="h3 mb-3">
                                    <strong>{place.name}</strong>
                                </h1>
                            </div>
                            <div className="col-md-6 text-end">
                                <Link
                                    to={"/places/" + place.id + "/edit"}
                                    className="btn btn-info btn-sm"
                                >
                                    Edit Place
                                </Link>
                            </div>
                        </div>

                        <div className="main-section">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src={
                                                place.image
                                                    ? BASE_URL + place.image
                                                    : "/img/places/p1.jpg"
                                            }
                                            alt={place.name}
                                            style={{
                                                height: "300px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 pb-0">
                                                {place.title}
                                            </h5>
                                        </div>
                                        <div className="card-body pt-1">
                                            <div className="jj-tags mb-3">
                                                {tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="badge bg-info me-1"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-muted">
                                                {place.address}, {place.city}
                                            </p>
                                            <p className="card-text">
                                                {place.description}
                                            </p>
                                            <div className="jj-actions">
                                                <a
                                                    href="#"
                                                    className="card-link"
                                                >
                                                    Show in Map
                                                </a>
                                                <a
                                                    href="#"
                                                    className="card-link ms-3"
                                                >
                                                    {place.temperature} deg/cel
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="jj-map">
                                        <div className="card card-body">
                                            <iframe
                                                height="300"
                                                frameBorder={0}
                                                scrolling="no"
                                                marginHeight={0}
                                                marginWidth={0}
                                                id="gmap_canvas"
                                                src={mapSrc}
                                            ></iframe>
                                        </div>
                                    </div>

                                    <div className="jj-map">
                                        <div className="card card-body">
                                            <ReviewList placeId={placeId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default PlaceDetails;
