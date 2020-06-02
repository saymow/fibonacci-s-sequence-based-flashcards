import React from "react";
import { Dialog } from "@material-ui/core";

import "./styles.css";

export default function Defaultdialog(props) {
  const { yesButton ,toggleDialog, Action, title, description } = props;

  const positiveOptions = ["Retrieve"]

  function actionHandler() {
    Action();
    toggleDialog(false);
  }

  return (
    <Dialog open={true}>
      <div className="dialogEl">
        <h3>{title}</h3>
        {description}
        <div 
         className={positiveOptions.indexOf(yesButton) === -1 ? "neg dialogOptionsEl" : "pos dialogOptionsEl"}
        >
          <button onClick={() => toggleDialog(false)}>Cancel</button>
          <button onClick={actionHandler}>{yesButton}</button>
        </div>
      </div>
    </Dialog>
  );
}
