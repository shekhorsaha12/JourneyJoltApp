import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const Header = ({ onSearchTextChanged }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get(API_URL + "profile/").then((res) => {
            setProfile(res.data.data);
        });
    }, []);

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center"></i>
            </a>

            <form className="form-inline my-2 my-lg-0 ms-3">
                <input
                    className="form-control-lg mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) =>
                        onSearchTextChanged &&
                        onSearchTextChanged(e.target.value)
                    }
                />
                {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            </form>

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i
                                className="align-middle"
                                data-feather="settings"
                            ></i>
                        </a>
                        <a
                            className="nav-link dropdown-toggle d-none d-sm-inline-block"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src="/img/avatar.png"
                                className="avatar img-fluid rounded me-1"
                                alt="Charles Hall"
                            />
                            <span className="text-dark">
                                {profile?.first_name
                                    ? `${profile.first_name} ${profile.last_name}`
                                    : profile?.email || "John Doe"}
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="/profile">
                                <i
                                    className="align-middle me-1"
                                    data-feather="user"
                                ></i>{" "}
                                Profile{" "}
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/login">
                                Log out
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
