import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const location = useLocation();

    if (location.pathname !== "/") {
        return null;
    }

    return (
        <div className="navigation-container">
            <div className="logo-container">
                <img src="../../../babbl-logo.png" />
            </div>
            {sessionUser ? (
                <div className="logged-in">
                    <ProfileButton user={sessionUser} />
                </div>
            ) : (
                <div className="signup-login-container">
                    <button
                        id="demo-login-button"
                        onClick={async () => {
                            // await user assignment in store before loading /babbl page
                            await dispatch(
                                thunkLogin({
                                    email: "demo@aa.io",
                                    password: "password",
                                })
                            );
                            navigate("/babbl");
                        }}
                    >
                        Demo Log In
                    </button>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                        className="login-button"
                    />
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                        className="signup-button"
                    />
                </div>
            )}
        </div>
    );
}

export default Navigation;
