import React, { useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import "./styles.css";
 
const ModalDefault = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    }
  })

  const openModal = () => setDisplay(true);
  const closeModal = () => setDisplay(false);

  return !display
    ? null
    : createPortal(
        <div className="modal-Wrapper">
          <div className="modal-backdrop" onClick={closeModal}></div>
          <div className="modal-box">{props.children}</div>
        </div>,
        document.querySelector("#modal-root")
      );
})

export default ModalDefault;