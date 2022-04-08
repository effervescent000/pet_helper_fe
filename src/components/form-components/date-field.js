import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

const DatePickerField = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => {
                    setFieldValue(field.name, val);
                }}
            />
        </div>
    );
};

export default DatePickerField;
