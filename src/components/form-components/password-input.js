import React from "react";
import { useField } from "formik";

const PasswordInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                className={`password-input ${meta.error && meta.touched ? "error" : null}`}
                type="password"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error-msg">{meta.error}</div> : null}
        </div>
    );
};

export default PasswordInput;
