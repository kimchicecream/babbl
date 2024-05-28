import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/babbl");
    }
  };

  const isSubmitDisabled = email.length === 0 || password.length === 0;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ margin: "10px 0 20px 0" }}>Log in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <h5>EMAIL {errors.email && <p>{errors.email}</p>}</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <h5>PASSWORD {errors.password && <p>{errors.password}</p>}</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="submit-container">
          <button className="submit-button" type="submit" disabled={isSubmitDisabled}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
