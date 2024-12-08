import React, {useState} from "react";
import { Link } from "react-router-dom";
import { clearCredentials } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';


const NavUI: React.FC = () => {

  const dispatch = useDispatch();

  const [logOut, setLogOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    dispatch(clearCredentials());
    setLogOut(true);
  }

    if (logOut) {
        return(
            <Navigate to="/login" />
        );
    }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
      <div>
        <Link to="/products" className="mx-2">Products</Link>
        <Link to="/cart" className="mx-2">Cart</Link>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </nav>
  );
};

export default NavUI;