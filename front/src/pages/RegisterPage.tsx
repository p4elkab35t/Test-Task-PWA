import InputAuth from "../components/Input.Auth";
import ButtonAuth from "../components/Button.Auth";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useRegisterMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);

    const [register] = useRegisterMutation();

    const [error, setError] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await register({ username, email, password }).unwrap();
            const { jwt, user } = response;
            dispatch(setCredentials({ jwt, user }));
            console.log('Registration successful:', response);
            setIsSuccess(true);
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
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
                <label className="text-2xl font-semibold">Register</label>
                <InputAuth type="text" placeholder="Username" value={username} onChange={handleUsernameChange} name="username" />
                <InputAuth type="email" placeholder="Email" value={email} onChange={handleEmailChange} name="email" />
                <InputAuth type="password" placeholder="Password" value={password} onChange={handlePasswordChange} name="password" />
                {error && <div className="text-red-500 max-w-40">{error}</div>}
                <ButtonAuth value="Register" name="Register" type="submit" />
                <Link to="/login" className="rounded-lg text-center font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-3 py-1">Login</Link>
            </form>
        </div>
    );
}

export default RegisterPage;