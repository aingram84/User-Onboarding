import React, { useState } from "react";


const Form = (props) => {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target
        const valueToUse = type === "checkbox" ? checked : value
        change(name, valueToUse)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.submit();
    };

    return (
        <form onSubmit={handleSubmit}>
<div className='errors'>
                <div>{errors.first_name}</div>
                <div>{errors.last_name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
            </div>
            <label>First Name
                <input placeholder="First Name" value={props.inputValues.first_name} type="text" name="first_name" onChange={handleChange} />
            </label>
            <label>Last Name
                <input placeholder="Last Name" value={props.inputValues.last_name} type="text" name="last_name" onChange={handleChange} />
            </label>
            <label>Email
                <input placeholder="Email" value={props.inputValues.email} type="text" name="email" onChange={handleChange} />
            </label>
            <label>Password
                <input placeholder="Password" value={props.inputValues.password} type="text" name="password" onChange={handleChange} />
            </label>
            <label>Terms of Service
                <input
                    type="checkbox"
                    name="tos"
                    checked={props.inputValues.tos}
                    onChange={handleChange}
                />
            </label>
            <input type="submit" disabled={disabled} value="Submit" />
        </form>
    )
}

export default Form;