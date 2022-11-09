import { object, string, ref } from "yup";


// Registation schema
export const registrationSchema = object({
    body: object({
        name: object().shape({
            first: string().required('Firstname is required!'),
            last: string().required('Lastname is required!'),
        }),
        email: string().required('Email is required!').email("Must be a valid email"),
        password: string()
            .required("Password is required")
            .min(8, "Password is too short - should be 8 chars minimum."),
        // .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
    })
})

/**
 * Login schema for request validation.
 */
export const loginSchema = object({
    body: object({
        email: string().required('Email is required!').email("Must be a valid email"),
        password: string()
            .required("Password is required")
            .min(8, "Password is too short - should be 8 chars minimum."),
    })
})