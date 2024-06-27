import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_URL + "login/", {
                email,
                password,
            });

            // Assuming the response contains a token
            const token = response.data.data.access_token;
            // Store the token in local storage for authentication
            localStorage.setItem("token", token);

            navigate("/places");
        } catch (error) {
            console.error("Error signing in:", error);
            window.alert("Error user or password !!");
            // Handle login error here
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(""); // Clear any previous password error
    };

    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome back!</h1>
                                <p className="lead">
                                    {" "}
                                    Sign in to your account to continue{" "}
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-3">
                                        <form
                                            onSubmit={(e) => onSubmitSignIn(e)}
                                        >
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Password
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    >
                                                        {showPassword
                                                            ? "Hide"
                                                            : "Show"}
                                                    </button>
                                                </div>
                                                {passwordError && (
                                                    <div className="text-danger">
                                                        {passwordError}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div className="form-check align-items-center">
                                                    <input
                                                        id="customControlInline"
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        value="remember-me"
                                                        name="remember-me"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        className="form-check-label text-small"
                                                        htmlFor="customControlInline"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2 mt-3">
                                                <button className="btn btn-lg btn-primary">
                                                    Sign in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-3">
                                {" "}
                                Don't have an account?{" "}
                                <Link to="/register">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
