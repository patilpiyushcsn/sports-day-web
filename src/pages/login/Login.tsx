import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
// import { userStore } from "../../store/user-store";

export const Login = () => {
  const [userId, setUserId] = useState<string>("");
  // const { id, setId } = userStore();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserIdChange = (event: any) => {
    setUserId(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlSubmitButtonClick = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignUp = () => {
    // Redirect to SignUp page
    navigate("/sign-up");
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <input
          type="text"
          name="userId"
          id="userId"
          placeholder="Enter Username"
          value={userId}
          onChange={handleUserIdChange}
        />
        <button type="submit" onClick={handlSubmitButtonClick}>
          Submit
        </button>
        <div className={styles.signUpContainer} onClick={handleSignUp}>
          SignUp?
        </div>
      </div>
    </div>
  );
};
