import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newuser = {
      email,
      username,
      firstName,
      lastName,
      password,
      imageUrl
    };
    console.log(newuser);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(thunkSignup(newuser));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
      navigate("/babbl");
    }
  };

  const handleImageError = () => {
      setImageError(true);
  };

  const handleImageLoad = () => {
      setImageError(false);
  };

  const isSubmitDisabled = email.length === 0 || username.length === 0 || firstName.length === 0 || lastName.length === 0 || password.length === 0;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ padding: "10px 0 20px 0" }}>Join babbl</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="form" onSubmit={handleSubmit}>
          <label className="user-image">
            <div className="current-pic">
                <img
                    src={imageUrl}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    className={imageError ? 'hidden' : ''}
                />
            </div>
            <div className="image-url-input">
              <h5>IMAGE URL</h5>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder="Feature coming soon!"
                />
            </div>
            </label>
        <label className="email">
          <h5>EMAIL ADDRESS {errors.email && <p>{errors.email}</p>}</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="username">
          <h5>USERNAME {errors.username && <p>{errors.username}</p>}</h5>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="first-name">
          <h5>FIRST NAME {errors.firstName && <p>{errors.firstName}</p>}</h5>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="last-name">
          <h5>LAST NAME {errors.lastName && <p>{errors.lastName}</p>}</h5>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="password">
          <h5>PASSWORD {errors.password && <p>{errors.password}</p>}</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="confirm-password">
          <h5>CONFIRM PASSWORD {errors.confirmPassword && <p>{errors.confirmPassword}</p>}</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="submit-container">
          <button className="submit-button" type="submit" disabled={isSubmitDisabled}>Join</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
