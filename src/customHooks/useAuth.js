import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuth = (props) => {
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });
  const currentUser = useSelector(mapState);

  useEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
