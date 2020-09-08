import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/util";
import FormWrap from "../FormWrap";
import { Button, FormInput } from "../Form";

const initialState = {
  email: "",
  error: [],
};
class EmailPassword extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found,please try again"];
          this.setState({
            error: [...err],
          });
        });
    } catch (err) {
      // console.log(err);
    }
  };
  render() {
    const { email, error } = this.state;
    const configTitle = {
      title: "reset password",
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
            type="email"
            label="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Button type="submit" cName="btn-reset">
            reset
          </Button>
        </form>
      </FormWrap>
    );
  }
}

export default withRouter(EmailPassword);
