import React, { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { MdError } from 'react-icons/md';
import { useField } from "@unform/core";

import "./styles.css";

export default function Input({name, ...rest}){
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    })
  }, [fieldName, registerField]);

  return(
    <div id="inputErrorDiv">
      <input ref={inputRef} {...rest}/>

      { error && 
      <div data-tooltip={error} id="react-error-icon">
        <IconContext.Provider value={{size: "1.5em"}}>
          <MdError />
        </IconContext.Provider>
      </div>}
    </div>
  );
}