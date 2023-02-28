import React, { useState } from "react";
import { useHistory } from "react-router";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

type LoginProps = { 
  setUserName: (value: string) => void
  setId: (value: number) => void
  setLogin: (value: boolean) => void
}

export function LogIn({setUserName, setId, setLogin}: LoginProps) {
  const [state, setState] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  
  const [errors, setErrors] = useState<LoginErrors>({});

  const validateFirstName = (value: string): LoginErrors => {
    const regName: RegExp = /^([a-zA-Z]{2,}\s*)+$/;
    if (!regName.test(value)) {
      return { firstName: "Please enter a valid name" };
    } else if (value.length > 50) {
      return { firstName: "First name cannot be more than 50 characters" };
    }
    return { firstName: undefined };
  };

  const handleInputFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ firstName: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateFirstName(event.target.value) }));
  };

  const validateLastName = (value: string): LoginErrors => {
    const regName: RegExp = /^([a-zA-Z]{2,}\s*)+$/;
    if (!regName.test(value)) {
      return { lastName: "Please enter a valid name" };
    } else if (value.length > 50) {
      return { lastName: "Last name cannot be more than 50 characters" };
    }
    return { lastName: undefined };
  };

  const handleInputLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ lastName: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateLastName(event.target.value) }));
  };

  const validateEmail = (value: string): LoginErrors => {
    const regEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regEmail.test(value)) {
      return { email: "Please enter a valid e-mail" };
    } else if (value.length > 254) {
      return { email: "E-mail cannot be more than 254 characters" };
    }
    return { email: undefined };
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ email: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateEmail(event.target.value) }));
  };

  const validatePassword = (value: string): LoginErrors => {
    const regPassword: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regPassword.test(value)) {
      return {
        password:
          "The password must be at least eight characters, and contain one uppercase letter and one number",
      };
    } else if (value.length > 20) {
      return { password: "The password cannot be more than 20 characters" };
    }
    return { password: undefined };
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ password: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validatePassword(event.target.value) }));
  };

  const validate = (): LoginErrors => {
    return {
      ...validateFirstName(state.firstName),
      ...validateLastName(state.lastName),
      ...validateEmail(state.email),
      ...validatePassword(state.password),
    };
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (valErrors.firstName || valErrors.firstName || valErrors.email || valErrors.password)
      return
    else {
      createUser(state)
      setUserName(state.firstName)
      setLogin(true)
    }
  };

async function createUser(user: User) {
  try { 
    const response = fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password})
  })
    .then(data => data.json())
    .then((res) => {
      setId(res)
    })
    return response; 
  }
  catch(error) {
    console.error(error);
  }
}

const history = useHistory();

  return (
    <div className="login-container">
      <h5>REGISTER AS A USER</h5>
      <form onSubmit={onSubmit}>
        {" "}
        {errors.firstName ? (
          <span style={{ color: "grey" }}>{errors.firstName}</span>
        ) : null}
        <br />
        <input
          type="text"
          name="name"
          placeholder="First name"
          value={state.firstName}
          onChange={handleInputFirstName}
          autoFocus
        />
        <br />
        {errors.lastName ? (
          <span style={{ color: "grey" }}>{errors.lastName}</span>
        ) : null}
        <br />
        <input
          type="text"
          name="name"
          placeholder="Last name"
          value={state.lastName}
          onChange={handleInputLastName}
          autoFocus
        />
        <br />
        {errors.email ? (
          <span style={{ color: "grey" }}>{errors.email}</span>
        ) : null}
        <br />
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={state.email}
          onChange={handleInputEmail}
          autoFocus
        />
        <br />
        {errors.password ? (
          <span style={{ color: "grey" }}>{errors.password}</span>
        ) : null}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputPassword}
          value={state.password}
          autoFocus
        />
        <br />
        <button className="button" type="submit">
          Sign up
        </button>
        <button className="button" onClick={() => history.push(`/`)}>Cancel</button>
      </form>
    </div>
  );
}
