import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import Spinner from "react-bootstrap/Spinner";

const EditPlace = () => {
    const { placeId } = useParams();
    const [place, setPlace] = useState();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL + "places/" + placeId + "/").then((res) => {
            setPlace(res.data.data);
            setUpInputs(res);
            setLoading(false);
        });
    }, [placeId]);

    const setUpInputs = (res) => {
        setName(res.data.data.name);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setAddress(res.data.data.address);
        setCity(res.data.data.city);
        setTags(res.data.data.tags);
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const onUpdate = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("tags", tags);
        formData.append("city", city);
        if (images.length !== 0) {
            formData.append("image", images[0]);
        }
        axios.put(API_URL + "places/" + place.id + "/", formData).then(
            (res) => {
                navigate("/places/" + res.data.data?.id);
            },
            (error) => {
                alert(JSON.stringify(error));
            },
        );
    };

    if (loading || !place) {
        return <Spinner animation="grow" />;
    }

    return (
        <>
            <div className="wrapper">
                <Sidebar />
                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3">
                                <strong>Edit Place</strong>
                            </h1>
                            <div className="main-section">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            id="name"
                                                            placeholder="Place name"
                                                            value={name}
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="images">
                                                            Cover Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="images"
                                                            className="form-control"
                                                            onChange={
                                                                handleFileChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="description">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            name="description"
                                                            id="description"
                                                            className="form-control"
                                                            cols="30"
                                                            rows="10"
                                                            placeholder="Place description"
                                                            value={description}
                                                            onChange={(e) =>
                                                                setDescription(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="title">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            className="form-control"
                                                            id="title"
                                                            placeholder="Place title"
                                                            value={title}
                                                            onChange={(e) =>
                                                                setTitle(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="city">
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            className="form-control"
                                                            id="city"
                                                            placeholder="Place City"
                                                            defaultValue={""}
                                                            value={city}
                                                            onChange={(e) =>
                                                                setCity(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="address">
                                                            Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            className="form-control"
                                                            id="address"
                                                            placeholder="Place Address"
                                                            defaultValue={""}
                                                            value={address}
                                                            onChange={(e) =>
                                                                setAddress(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="tags">
                                                            Tags
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="tags"
                                                            className="form-control"
                                                            id="tags"
                                                            placeholder="Place tags"
                                                            value={tags}
                                                            onChange={(e) =>
                                                                setTags(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-success"
                                                onClick={() => onUpdate()}
                                            >
                                                Update Place
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default EditPlace;
