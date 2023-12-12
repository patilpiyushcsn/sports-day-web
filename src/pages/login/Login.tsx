import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UsersService } from "../../services/users.service";
// import { userStore } from "../../store/user-store";

export const Login = () => {
  const [username, setUserId] = useState<string>("");
  // const { id, setId } = userStore();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserIdChange = (event: any) => {
    setUserId(event.target.value);
  };

  // Create User Mutation
  const { mutate: loginMutate, isSuccess, status } = useMutation({
    mutationFn: UsersService.login,
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if(isSuccess){
      navigate('/home');
    }
  }, [status]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlSubmitButtonClick = () => {
    loginMutate(username);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignUp = () => {
    // Redirect to SignUp page
    navigate("/sign-up");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <div>
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="Enter Username"
            value={username}
            onChange={handleUserIdChange}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handlSubmitButtonClick}
        >
          Submit
        </button>
        <div className={styles.signUpContainer}>
          <p>Don't have an account?</p>
          <button
            type="submit"
            className={styles.signUpButton}
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
