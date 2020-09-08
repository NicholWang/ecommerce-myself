import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/util";
import { Button, FormInput } from "../Form";
import { signInWithGoogle } from "../../firebase/util";
import FormWrap from "../FormWrap";

const initialState = {
  email: "",
  password: "",
};
class SignIn extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      // console.log(err);
    }
  };
  componentDidMount() {}
  render() {
    const { email, password } = this.state;
    const configTitle = {
      title: "sign in",
    };
    return (
      <FormWrap {...configTitle}>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <FormInput
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
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
}

export default SignIn;
