import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form } from "@unform/web";

import Input from "./../../../components/form/input";
import { useAuth } from "./../../../contexts/auth";
import ImgSlider from "../../../components/authImageSlider";

import "./../styles.css";

export default function SignIn() {
  const formRef = useRef(null);
  const { signIn } = useAuth();

  async function signInHandler(data) {
    const error = await signIn(data);

    if (error) {
      const { type, text } = error.error;

      console.log(type, text);

      formRef.current.setErrors({
        [type]: text,
      });
    }
  }

  async function submitHandler(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email is necessary.")
          .email("Invalid email type.")
          .max(320, "Email too long."),
        password: Yup.string()
          .required("Password is necessary.")
          .min(8, "At least 8 characters.")
          .max(18, "Password to loong."),
      });

      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      signInHandler(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessage = {};

        err.inner.forEach((error) => {
          errorMessage[error.path] = error.message;
          formRef.current.clearField(error.path);
        });

        formRef.current.setErrors(errorMessage);
      }
    }
  }

  return (
    <div className="authContainer">
      <div className="authEl">
        <div className="authHeaderEl">
          Are you new here? <Link to="/register">register</Link>
        </div>
        <div className="authFormWrapperEl">
          <div className="authDescriptionEl">
            <h2>Welcome</h2>
            <p>
              Lorem ipsum dolor sit amet, sed do labore et dolore magna aliqua.
            </p>
          </div>
          <Form ref={formRef} className="authFormEl" onSubmit={submitHandler}>
            <div className="authFormDivEl">
              <Input
                className="authInputEl"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="authFormDivEl">
              <Input
                className="authInputEl"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button>Sign in</button>
          </Form>
          <Link to="">-Forgot password</Link>
        </div>
        <div className="authFooterEl">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod <span>tempor </span>incididunt ut labore et dolore magna
            aliqua. Purus faucibus ornare <span> suspendisse </span>sed nisi
            lacus sed viverra tellus. Pharetra.
          </p>
        </div>
      </div>
      <ImgSlider />
    </div>
  );
}
