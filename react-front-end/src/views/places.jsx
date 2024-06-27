import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FeaturedPlaces from "./components/featured-places";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import Spinner from "react-bootstrap/Spinner";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const pageSize = 3;

    const location = useLocation();

    useEffect(() => {
        if (location.state?.q) {
            setSearchQuery(location.state?.q);
        }
    }, []);

    useEffect(() => {
        axios
            .get(API_URL + "places/?q=" + searchQuery + "&page=" + page)
            .then((res) => {
                setPlaces(res.data.results);
                setTotalCount(res.data.count);
                setLoading(false);
            });
    }, [searchQuery, page]);

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header
                    onSearchTextChanged={(searchText) => {
                        setSearchQuery(searchText);
                        setPage(1);
                    }}
                />
                <main className="content">
                    <div className="container-fluid p-0">
                        <div className="main-section">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h1 className="h3 mb-3">
                                                <strong>Places</strong>
                                            </h1>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <Link
                                                to="/places/add"
                                                className="btn btn-info btn-sm"
                                            >
                                                Add new Place
                                            </Link>
                                        </div>
                                    </div>

                                    {loading || !places ? (
                                        <Spinner animation="grow" />
                                    ) : (
                                        places.map((place) => {
                                            return (
                                                <div
                                                    className="card"
                                                    key={place.id}
                                                >
                                                    <img
                                                        className="card-img-top"
                                                        src={
                                                            place.image
                                                                ? place.image
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
                                                        <p className="text-muted">
                                                            {place.name}
                                                        </p>
                                                        <p className="card-text">
                                                            {place.description}
                                                        </p>
                                                        <p className="text-muted">
                                                            {place.address},{" "}
                                                            {place.city}
                                                        </p>
                                                        <div className="jj-tags mb-3">
                                                            {place.tags
                                                                .split(",")
                                                                .map(
                                                                    (
                                                                        tag,
                                                                        index,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="badge bg-info me-1"
                                                                        >
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                        </div>
                                                        <div className="jj-actions">
                                                            <Link
                                                                to={
                                                                    "/places/" +
                                                                    place.id
                                                                }
                                                                className="btn btn-primary"
                                                            >
                                                                View Details
                                                            </Link>
                                                            <a
                                                                href="#"
                                                                className="card-link ms-3"
                                                            >
                                                                Show in Map
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="card-link ms-3"
                                                            >
                                                                {
                                                                    place.temperature
                                                                }
                                                                deg/cel
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <FeaturedPlaces />
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <PaginationControl
                            page={page}
                            between={4}
                            total={totalCount}
                            limit={pageSize}
                            changePage={setPage}
                            ellipsis={1}
                        />
                    </>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Places;
