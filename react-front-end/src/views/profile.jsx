import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { API_URL } from "../constants";
import { Spinner } from "react-bootstrap";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [designation, setDesignation] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [vk, setVk] = useState("");

    const setInputs = (profile) => {
        setEmail(profile.email);
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setPhone(profile.phone);
        setOccupation(profile.occupation);
        setDesignation(profile.designation);
        setCurrentAddress(profile.current_address);
        setPermanentAddress(profile.permanent_address);
        setFacebook(profile.facebook);
        setInstagram(profile.instagram);
        setLinkedin(profile.linkedin);
        setVk(profile.vk);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL + "profile/").then((res) => {
            setProfile(res.data.data);
            setInputs(res.data.data);
            setLoading(false);
        });
    }, []);

    const onClickUpdate = () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("phone", phone);
        formData.append("occupation", occupation);
        formData.append("designation", designation);
        formData.append("current_address", currentAddress);
        formData.append("permanent_address", permanentAddress);
        formData.append("facebook", facebook);
        formData.append("instagram", instagram);
        formData.append("linkedin", linkedin);
        formData.append("vk", vk);

        axios.put(API_URL + "profile/", formData).then(
            (res) => {
                setProfile(res.data.data);
                setInputs(res.data.data);
            },
            (error) => {
                alert(JSON.stringify(error));
            },
        );
    };

    if (loading) {
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
                                <strong>Profile</strong>
                            </h1>

                            <div className="main-section">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">
                                                    Profile Information
                                                </h5>
                                            </div>
                                            <div className="card-body text-center">
                                                <img
                                                    src="/img/avatar.png"
                                                    alt=""
                                                    className="img-fluid rounded-circle mb-2"
                                                    width="128"
                                                    height="128"
                                                />
                                                <h5 className="card-title mb-0">
                                                    {profile.first_name}{" "}
                                                    {profile.last_name}
                                                </h5>
                                                <div className="text-muted mb-2">
                                                    {profile.role}
                                                </div>
                                                <div className="mt-2">
                                                    <a
                                                        href={`mailto:${profile.email}`}
                                                    >
                                                        {profile.email}
                                                    </a>
                                                    ,{" "}
                                                    <a
                                                        href={`tel:${profile.phone}`}
                                                    >
                                                        {profile.phone}
                                                    </a>
                                                </div>
                                            </div>
                                            <hr className="my-0" />
                                            <hr className="my-0" />
                                            <div className="card-body">
                                                <h5 className="h6 card-title">
                                                    About
                                                </h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="mb-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-home feather-sm me-1"
                                                        >
                                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                        </svg>{" "}
                                                        Lives in{" "}
                                                        <a href="#">
                                                            {
                                                                profile.current_address
                                                            }
                                                        </a>
                                                    </li>
                                                    <li className="mb-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-map-pin feather-sm me-1"
                                                        >
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                            <circle
                                                                cx="12"
                                                                cy="10"
                                                                r="3"
                                                            ></circle>
                                                        </svg>{" "}
                                                        From{" "}
                                                        <a href="#">
                                                            {
                                                                profile.permanent_address
                                                            }
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body">
                                                <h5 className="h6 card-title">
                                                    Elsewhere
                                                </h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="mb-1">
                                                        <a
                                                            href={`https://facebook.com/${profile.facebook}`}
                                                        >
                                                            Facebook
                                                        </a>
                                                    </li>
                                                    <li className="mb-1">
                                                        <a
                                                            href={`https://instagram.com/${profile.instagram}`}
                                                        >
                                                            Instagram
                                                        </a>
                                                    </li>
                                                    <li className="mb-1">
                                                        <a
                                                            href={`https://linkedin.com/${profile.linkedin}`}
                                                        >
                                                            LinkedIn
                                                        </a>
                                                    </li>
                                                    <li className="mb-1">
                                                        <a
                                                            href={`https://vk.com/${profile.vk}`}
                                                        >
                                                            VK
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">
                                                    Update Profile Information
                                                </h5>
                                            </div>
                                            <form
                                                action="#"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            className="form-control"
                                                            id="firstName"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={(e) =>
                                                                setFirstName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            className="form-control"
                                                            id="lastName"
                                                            placeholder="Last Name"
                                                            value={lastName}
                                                            onChange={(e) =>
                                                                setLastName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="email">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            className="form-control"
                                                            id="email"
                                                            placeholder="Enter Email"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="phone">
                                                            Phone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            id="phone"
                                                            placeholder="Enter phone"
                                                            value={phone}
                                                            onChange={(e) =>
                                                                setPhone(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="current_address">
                                                            Current Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="current_address"
                                                            className="form-control"
                                                            id="current_address"
                                                            placeholder="Current Address"
                                                            value={
                                                                currentAddress
                                                            }
                                                            onChange={(e) =>
                                                                setCurrentAddress(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="permanent_address">
                                                            Permanent Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="permanent_address"
                                                            className="form-control"
                                                            id="permanent_address"
                                                            placeholder="Permanent address"
                                                            value={
                                                                permanentAddress
                                                            }
                                                            onChange={(e) =>
                                                                setPermanentAddress(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="occupation">
                                                            Occupation
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="occupation"
                                                            className="form-control"
                                                            id="occupation"
                                                            placeholder="Occupation"
                                                            value={occupation}
                                                            onChange={(e) =>
                                                                setOccupation(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="designation">
                                                            Designation
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="designation"
                                                            className="form-control"
                                                            id="designation"
                                                            placeholder="Designation"
                                                            value={designation}
                                                            onChange={(e) =>
                                                                setDesignation(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="facebook">
                                                                    Facebook
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="facebook"
                                                                    className="form-control"
                                                                    id="facebook"
                                                                    placeholder="Facebook Username e.g. shekhor"
                                                                    value={
                                                                        facebook
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setFacebook(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="instagram">
                                                                    Instagram
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="instagram"
                                                                    className="form-control"
                                                                    id="instagram"
                                                                    placeholder="Instagram Handle e.g. shekhor"
                                                                    value={
                                                                        instagram
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setInstagram(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="linkedin">
                                                                    LinkedIn
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="linkedin"
                                                                    className="form-control"
                                                                    id="linkedin"
                                                                    placeholder="Linkedin Username: e.g. shekhor"
                                                                    value={
                                                                        linkedin
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setLinkedin(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="vk">
                                                                    VK
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="vk"
                                                                    className="form-control"
                                                                    id="vk"
                                                                    placeholder="VK Username e.g. shekhor"
                                                                    value={vk}
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setVk(
                                                                            e
                                                                                .target
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
                                                        type="submit"
                                                        className="btn btn-info"
                                                        onClick={onClickUpdate}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
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

export default Profile;
