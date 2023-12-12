import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useMutation } from "@tanstack/react-query";
import { User, UsersService } from "../../services/users.service";
import { useEffect, useState } from "react";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlSubmitButtonClick = () => {
    const user: User = {
      username,
      firstName,
      lastName,
    };
    createUserMutate(user);
  };

  // Create User Mutation
  const {
    mutate: createUserMutate,
    isSuccess,
    status,
  } = useMutation({
    mutationFn: UsersService.createUser,
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [status]);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.wrapper}>
        <h1>Sign Up</h1>
        <div>
          {/* <label htmlFor="userId">User Id: </label> */}
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          onClick={handlSubmitButtonClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
