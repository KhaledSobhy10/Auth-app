import { ReactNode, FunctionComponent, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";



interface IUserGuardProps {
  children: ReactNode
}

const UserGuard: FunctionComponent<IUserGuardProps> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  useEffect(() => {

    if (localStorage.getItem("user_token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [])


  if (isLoggedIn === null)
    return <div className="fixed top-1/2 left-1/2 animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  if (isLoggedIn)
    return <>{props.children}</>;
  return <Navigate to={"/login"} />



};

export default UserGuard;

