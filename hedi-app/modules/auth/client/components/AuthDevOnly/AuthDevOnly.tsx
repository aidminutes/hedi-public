import { FormEventHandler, useState } from "react";
import { login, logout } from "../../functions";
import {
  Button,
  Form,
  TextInput,
  InlineLoading,
} from "carbon-components-react";
import { AssertEnvProduction } from "@/modules/common/utils";
import { useUser } from "@/modules/auth/client/hooks";

export const AuthDevOnly = () => {
  if (AssertEnvProduction())
    throw Error("Development code in production mode detected");

  const [user, isLoading] = useUser();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    setSubmitting(true);
    login(username, password).then(() => setSubmitting(false));
  };

  return isLoading ? (
    <InlineLoading />
  ) : user ? (
    <Button type="button" onClick={() => logout()}>
      Logout {user.name}
    </Button>
  ) : (
    <Form onSubmit={handleSubmit}>
      <TextInput
        labelText={false}
        placeholder="Username"
        id="username"
        type="text"
      />
      <TextInput
        labelText={false}
        placeholder="Password"
        type="password"
        id="password"
      />
      {!submitting && <Button type="submit">Login</Button>}
    </Form>
  );
};
