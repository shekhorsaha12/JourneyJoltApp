import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validateName = (name) => {
        if (name.trim() === "") {
            return "Name cannot be empty";
        }
        if (name.trim().length < 2) {
            return "Name must be at least 2 characters";
        }
        if (!/^[A-Za-z]+$/.test(name.trim())) {
            return "Name can only contain letters";
        }
        return "";
    };

    const validateEmail = (email) => {
        if (email.trim() === "") {
            return "Email cannot be empty";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return "Invalid email format";
        }
        return "";
    };

    const validatePassword = (password) => {
        if (password.trim() === "") {
            return "Password cannot be empty";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/[#$]/.test(password)) {
            return "Password can only contain special characters '#' or '$'";
        }
        return "";
    };

    const onSubmitSignUp = async (e) => {
        e.preventDefault();

        // Name validation
        const firstNameValidationError = validateName(firstName);
        if (firstNameValidationError) {
            setFirstNameError(firstNameValidationError);
            return;
        }

        const lastNameValidationError = validateName(lastName);
        if (lastNameValidationError) {
            setLastNameError(lastNameValidationError);
            return;
        }

        // Email validation
        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        // Password validation
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(API_URL + "register/", {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            });
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle registration error here
        }
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFirstNameError(""); // Clear any previous name error
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setLastNameError(""); // Clear any previous name error
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(""); // Clear any previous email error
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(""); // Clear any previous password error
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(""); // Clear any previous confirm password error
    };

    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2"> Welcome </h1>
                                <p className="lead"> Sign up & continue </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-3">
                                        <form onSubmit={onSubmitSignUp}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    First Name
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="Enter your first name"
                                                    value={firstName}
                                                    onChange={
                                                        handleFirstNameChange
                                                    }
                                                />
                                                {firstNameError && (
                                                    <div className="text-danger">
                                                        {firstNameError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Last Name
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Enter your last name"
                                                    value={lastName}
                                                    onChange={
                                                        handleLastNameChange
                                                    }
                                                />
                                                {lastNameError && (
                                                    <div className="text-danger">
                                                        {lastNameError}
                                                    </div>
                                                )}
                                            </div>
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
                                                {emailError && (
                                                    <div className="text-danger">
                                                        {emailError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                />
                                                {passwordError && (
                                                    <div className="text-danger">
                                                        {passwordError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Retype your password"
                                                    value={confirmPassword}
                                                    onChange={
                                                        handleConfirmPasswordChange
                                                    }
                                                />
                                                {confirmPasswordError && (
                                                    <div className="text-danger">
                                                        {confirmPasswordError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="d-grid gap-2 mt-3">
                                                <button className="btn btn-lg btn-primary">
                                                    Sign up
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-3">
                                {" "}
                                Already have an account?{" "}
                                <Link to="/login">Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
