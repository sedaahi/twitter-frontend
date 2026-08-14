import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendirilecektir.

function ProtectedRoute({ children }) {
  const token = useSelector(
    (state) => state.auth.token
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;