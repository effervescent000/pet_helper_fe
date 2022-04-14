import React from "react";
import { useField } from "formik";

const CheckboxInput = ({ label, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {label}
            </label>
        </div>
    );
};

export default CheckboxInput;
