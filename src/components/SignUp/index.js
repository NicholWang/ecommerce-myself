import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, FormInput } from "../Form";
import { auth, handleUserProfile } from "../../firebase/util";
import FormWrap from "../FormWrap";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);

  const resetForms = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const err = ["password don't match"];
      setError([...err]);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await handleUserProfile(user, { displayName });
      resetForms();
      props.history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const configTitle = {
    title: "sign up",
  };
  return (
    <FormWrap {...configTitle}>
      <form onSubmit={handleSubmit}>
        {error.length > 0 &&
          error.map((err, index) => {
            return (
              <li key={index} className="show-error">
                {err}
              </li>
            );
          })}
        <FormInput
          type="text"
          name="displayName"
          label="username"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button>Register</Button>
      </form>
    </FormWrap>
  );
};

export default withRouter(SignUp);
