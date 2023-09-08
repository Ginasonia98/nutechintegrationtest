import { Navigate, Route } from "react-router-dom";
import Proptypes from "prop-types";

function ProtectedRoute({ component: Component, ...rest }) {
  const authenticatedJWT = localStorage.getItem("token_User");
  console.log("this", authenticatedJWT);

  <Route
    {...rest}
    render={(props) =>
      authenticatedJWT ? <Component {...props} /> : <Navigate to="/login" />
    }
  />;
}

ProtectedRoute.propTypes = {
  component: Proptypes.any,
  rest: Proptypes.any,
};

export default ProtectedRoute;
