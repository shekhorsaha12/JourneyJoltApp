import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Places from "./views/places";
import PlaceDetails from "./views/place-details";
import Profile from "./views/profile";
import CreatePlace from "./views/create-place";
import EditPlace from "./views/edit-place";
import axios from "axios";
import { AuthGuard } from "./components/AuthGuard";

axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/places" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route element={<AuthGuard />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/places" element={<Places />} />
                    <Route path="/places/:placeId" element={<PlaceDetails />} />
                    <Route path="/places/add" element={<CreatePlace />} />
                    <Route
                        path="/places/:placeId/edit"
                        element={<EditPlace />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
