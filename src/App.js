import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./default.scss";

//layout
import MainLayout from "./Layout/MainLayout";

//page
import HomePage from "./page/HomePage";
import Login from "./page/Login";
import Register from "./page/Resister";
import Recovery from "./page/Recovery";
import DashBoard from "./page/DashBoard";

//firebase
import { auth, handleUserProfile } from "./firebase/util";

//redux
import { setCurrentUser } from "./Redux/User/user.actions";

//HOC && custom hook
import WithAuth from "./components/HOC/WithAuth";

//refactor with function component
const App = (props) => {
  const { currentUser, setCurrentUser } = props;
  useEffect(() => {
    /**
     * watch the state,
     * if anyone login , the state changed;
     * then call handleUserProfile function,
     * and finally dispatch action
     *  */
    const authListener = auth.onAuthStateChanged(async (user) => {
      // console.log(user);
      const userRef = await handleUserProfile(user);
      // console.log(userRef);
      if (userRef) {
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      /*
        if user is null or logout ,the user parameter will change automaticly,
      so dispatch user to setCurrentUser action directlty
      */
      setCurrentUser(user);
    });

    //destory event listener
    return () => {
      authListener();
    };
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <HomePage />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Login />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Register />
              </MainLayout>
            </WithAuth>
          )}
        />

        <Route
          path="/recovery"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Recovery />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <DashBoard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser });
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
