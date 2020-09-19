import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase/util";
import { Button, FormInput } from "../Form";
import { signInWithGoogle } from "../../firebase/util";
import FormWrap from "../FormWrap";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const configTitle = {
    title: "sign in",
  };

  const resetForms = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForms();
      props.history.push("/");
      // this.setState({
      //   ...initialState,
      // });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <FormWrap {...configTitle}>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">LogIn</Button>
        <Button onClick={signInWithGoogle} cName="btn-secondary">
          Sign In With Goggle
        </Button>
        <div className="forget-wrap">
          <Link to="/recovery" className="forget-link">
            forget password ?
          </Link>
        </div>
      </form>
    </FormWrap>
  );
}

export default withRouter(SignIn);
