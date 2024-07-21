import * as Yup from "yup";

export const validationLoginSchema = Yup.object({
  username: Yup.string().matches(/^user\d+$/, 'The username must be in the same format as in the test task').required('Username is required'),
  password: Yup.string().min(6, 'Short password').max(10, 'Long password').required('Password is required'),
});