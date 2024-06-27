import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <ul className="sidebar-nav mt-5">
                    <li
                        className={`sidebar-item ${
                            location.pathname.startsWith("/places")
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link className={`sidebar-link`} to="/places">
                            <i className="align-middle" data-feather="user"></i>
                            <span className="align-middle">Places</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
