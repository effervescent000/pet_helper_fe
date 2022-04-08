import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";

import TextInput from "../form-components/text-input";
import PasswordInput from "../form-components/password-input";
import { UserContext } from "../../user-context";

const AuthForm = ({ status }) => {
    const history = useHistory();
    const { setUser, toggleLogIn } = useContext(UserContext);

    const handleSubmit = (values) => {
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/auth/${status.toLowerCase()}`, values, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setUser(response.data);
                toggleLogIn();
                history.push("/");
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <Formik
            initialValues={{ username: "", password: "", confirmPassword: "" }}
            onSubmit={handleSubmit}
        >
            <Form className="auth-form">
                <TextInput name="username" label="Username" />
                <PasswordInput name="password" label="Password" />
                {status === "SIGNUP" ? (
                    <PasswordInput name="confirmPassword" label="Confirm Password" />
                ) : null}
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default AuthForm;
