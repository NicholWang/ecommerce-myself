import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/util";
import FormWrap from "../FormWrap";
import { Button, FormInput } from "../Form";

function EmailPassword(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/login",
    };

    //reset password by email
    //if success, push to login page
    //else display error
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found,please try again"];
          setError([...err]);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  const configTitle = {
    title: "reset password",
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
          type="email"
          label="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" cName="btn-reset">
          reset
        </Button>
      </form>
    </FormWrap>
  );
}

export default withRouter(EmailPassword);
