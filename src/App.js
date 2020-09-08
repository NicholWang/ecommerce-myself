import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./default.scss";

//layout
import MainLayout from "./Layout/MainLayout";

//page
import HomePage from "./page/HomePage";
import Login from "./page/Login";
import Register from "./page/Resister";
import Recovery from "./page/Recovery";

//firebase
import { auth, handleUserProfile } from "./firebase/util";

const initialState = {
  currentUser: null,
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }
  authListener = null;
  componentDidMount() {
    /**
     * watch the state,
     * if anyone login , the state changed;
     * then call handleUserProfile function,
     * and finally setState
     *  */
    this.authListener = auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const userRef = await handleUserProfile(user);
      console.log(userRef);
      if (userRef) {
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      this.setState({
        ...initialState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout currentUser={currentUser}>
                <HomePage />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/register"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Register />
                </MainLayout>
              )
            }
          />

          <Route
            path="/recovery"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Recovery />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
