import styles from "./SignUp.module.css";

export const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlSubmitButtonClick = () => {};

  return (
    <div className={styles.signUpContainer}>
      <div>
        <label htmlFor="userId">User Id: </label>
        <input type="text" name="userId" id="userId" />
      </div>

      <div>
        <label htmlFor="firstName">First Name: </label>
        <input type="text" name="firstName" id="firstName" />
      </div>

      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name="lastName" id="lastName" />
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        onClick={handlSubmitButtonClick}
      >
        Submit
      </button>
    </div>
  );
};
