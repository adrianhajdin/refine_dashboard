import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
