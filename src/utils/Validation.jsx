import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("username is required").trim(),
  password: Yup.string().required("Password is required").trim(),
});








