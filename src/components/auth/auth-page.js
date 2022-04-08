import React, { useState, useContext } from "react";

import AuthForm from "./auth-form";

const AuthPage = ({ status }) => {
    return (
        <div className="auth-wrapper">
            <AuthForm status={status} />
        </div>
    );
};

export default AuthPage;
