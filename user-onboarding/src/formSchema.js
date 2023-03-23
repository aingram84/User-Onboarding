import * as yup from "yup";

const formSchema = yup.object().shape({
    first_name: yup.string()
        .trim()
        .required("First name required")
        .min(3, "Name must be 3 chars"),
    last_name: yup.string()
        .trim()
        .required("Last name required")
        .min(3, "Name must be 3 chars"),
    email: yup
        .string()
        .email("Must be valid email")
        .required("Email required"),
    password: yup.string()
        .trim()
        .required("Password Required")
        .min(5, "Password must be 5 chars"),
    tos: yup.boolean(),
})    

export default formSchema;