import React, { useRef } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";

import Header from "../../components/header";
import Input from "../../components/form/input";

import "./styles.css";

export default function ChangePassword() {
  const formRef = useRef();

  async function submitHandler(data, { reset }){
    console.log(data)
    
    try{
      const schema = Yup.object().shape({
        password: Yup.string()
          .required("Password is necessary.")
          .min(8, "Invalid password")
          .max(16, "Invalid password")
          .matches(/[A-Z][a-z][\d]/, "Password must have capitalized,\n non capitalized letters and numbers."),
        newPassword: Yup.string()
          .required("New password is necessary.")
          .matches(/[A-Z][a-z][\d]/, "Password must have capitalized,\n non capitalized letters and numbers."),
        newPasswordMatch: Yup.string()
          .required("Password confirm is necessay.")
          .oneOf([Yup.ref("newPassword")], "New password does not match.")
      })

      formRef.current.setErrors({});

      reset();
      
      await schema.validate(data, {
        abortEarly: false
      })

      /*SOME FUNCTION TO VERIFY IF THE ACTUAL PASSWORD IS CORRECT*/

    }
    catch (err){
      if (err instanceof Yup.ValidationError){
        const errorMassage = {}

        err.inner.forEach(error => {
          errorMassage[error.path] = error.message;
        })

        console.log(errorMassage);

        formRef.current.setErrors(errorMassage);
      }
    }
  }

  return (
    <div className="wrapperEl">
      <Header />
      <div className="changePasswordContainerEl">
        <Form ref={formRef} className="changePasswordFormEl" onSubmit={submitHandler}>
          <div className="authFormDivEl">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="authFormDivEl">
            <Input
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              type="password"
            />
          </div>
          <div className="authFormDivEl">
            <Input
              id="newPasswordMatch"
              name="newPasswordMatch"
              placeholder="Confirm"
              type="password"
            />
          </div>
          <button>Change password</button>
        </Form>
      </div>
    </div>
  );
}
