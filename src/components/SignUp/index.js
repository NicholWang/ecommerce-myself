import React, { Component } from "react";
import "./style.scss";
import { Button, FormInput } from "../Form";
import { auth, handleUserProfile } from "../../firebase/util";
import FormWrap from "../FormWrap";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: [],
};
class SignUp extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {}
  handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, error } = this.state;
    if (password !== confirmPassword) {
      const err = ["password don't match"];
      this.setState({
        error: [...err],
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      // console.log(err);
    }
  };
  render() {
    const { displayName, email, password, confirmPassword, error } = this.state;
    const configTitle = {
      title: "sign up",
    };
    return (
      <FormWrap {...configTitle}>
        <form onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            label="password"
            value={password}
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="confirm password"
            value={confirmPassword}
            onChange={this.handleChange}
          />
          <Button>Register</Button>
        </form>
      </FormWrap>
    );
  }
}

export default SignUp;
