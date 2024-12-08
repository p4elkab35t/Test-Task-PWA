import InputAuth from "../components/Input.Auth";
import ButtonAuth from "../components/Button.Auth";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useLoginMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";


const LoginPage: React.FC = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");


    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login({ identifier, password }).unwrap();
            const { jwt, user } = response;
            dispatch(setCredentials({ jwt, user }));
            setIsSuccess(true);
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        }
    }

if(isSuccess) {
    return(
        <Navigate to="/products" />
    );
}

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="text-2xl font-semibold">Login {}</label>
                <InputAuth type="identifier" placeholder="Email/Login" value={identifier} onChange={handleIdentifierChange} name="identifier" />
                <InputAuth type="password" placeholder="Password" value={password} onChange={handlePasswordChange} name="password" />
                {error && <div className="text-red-500">{error}</div>}
                <ButtonAuth value="Login" name="login" type="submit" />
                <Link to="/register" className="rounded-lg text-center font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-3 py-1">Register</Link>
            </form>
        </div>
    );
}

export default LoginPage;