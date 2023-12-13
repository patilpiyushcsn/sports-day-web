import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { Home } from "../pages/home/Home";
import { SignUp } from "../pages/sign-up/SignUp";

export const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
