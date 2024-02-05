import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../services/hooks/hooks";

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth?: boolean, component: JSX.Element}): JSX.Element | null => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
  <Protected onlyUnAuth={true} component={component} />
);