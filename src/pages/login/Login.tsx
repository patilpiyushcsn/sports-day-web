import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UsersService } from "../../services/users.service";
import { userStore } from "../../store/user-store";

export const Login = () => {
  const [username, setUserId] = useState<string>("");
  
  const { setId } = userStore();

  const navigate = useNavigate();

  // Login Mutation
  const {
    mutate: loginMutate,
    isSuccess,
    status,
    data,
  } = useMutation({
    mutationFn: UsersService.login,
  });

  useEffect(() => {
    if (isSuccess) {
      const userId = data._id;
      setId(userId ?? "");
      navigate("/home");
    }
  }, [status]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <input
          type="text"
          name="userId"
          id="userId"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => {
            loginMutate(username);
          }}
        >
          Submit
        </button>
        <div className={styles.signUpContainer}>
          <p>Don't have an account?</p>
          <button
            type="submit"
            className={styles.signUpButton}
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
