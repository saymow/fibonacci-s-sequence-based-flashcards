import React, { useRef } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import TextEditor from "./../../components/textEditor";
import Header from "./../../components/header";
import deckManager from "../../services/connection";

import "./styles.css";

export default function AddCards(props) {
  const frontCardRef = useRef();
  const backCardRef = useRef();
  const title = props.match.params.deckName;
  const { deckId } = props.location;

  async function handleDoneSubmit() {
    let frontCardState = frontCardRef.current.editorText;

    const htmlOptions = {
      inlineStyleFn: (styles) => {
        if (styles._map._list?._tail?.array) {
          const cssStyles = [];
          styles._map._list._tail.array.forEach((value) => {
            if (!value) return;

            let item = value[0];

            if (
              item.match(/^bgcolor/) ||
              item.match(/^color/) ||
              item.match(/^fontsize/)
            ) {
              let [atr, value] = item.split("-");
              cssStyles.push({
                atr:
                  atr === "fontsize"
                    ? "fontSize"
                    : atr === "bgcolor"
                    ? "backgroundColor"
                    : atr,
                value: atr === "fontsize" ? value + "px" : value,
              });
            }
          });

          if (cssStyles.length !== 0) {
            let style = {};
            cssStyles.forEach((item) => {
              style[item.atr] = item.value;
            });

            return {
              element: "span",
              style,
            };
          }
        }
      },
    };

    if (
      frontCardState["blocks"]?.length === 1 &&
      frontCardState["blocks"][0]["text"] === ""
    ) {
      alert("Front card must be filled");
      return;
    }

    let frontCardHtml = stateToHTML(
      frontCardRef.current.state.editorState.getCurrentContent(),
      htmlOptions
    );


    let backCardHtml =  backCardRef.current.state.editorState ?  stateToHTML(
      backCardRef.current.state.editorState.getCurrentContent(),
      htmlOptions
    ) : "<p></p>";

    frontCardRef.current.setEditorText("");
    backCardRef.current.setEditorText("");
    frontCardRef.current.setState({
      editorText: EditorState.createEmpty(),
    });
    backCardRef.current.setState({
      editorText: EditorState.createEmpty(),
    });

    await handleSaving(frontCardHtml, backCardHtml);
  }

  async function handleSaving(frontSide, backSide) {
    await deckManager.createCard(deckId, frontSide, backSide);
  }

  return (
    <div className="wrapperEl">
      <Header title={title} activity="Add cards" />
      <div className="manageCardsContainerEl">
        <div className="frontCardEl cardEl">
          <h1>Front</h1>
          <TextEditor ref={frontCardRef} />
        </div>
        <div className="backCardEl cardEl">
          <h1>Back</h1>
          <TextEditor ref={backCardRef} />
        </div>
        <div className="optionsAddCardEl">
          <button onClick={handleDoneSubmit}>Add card</button>
        </div>
      </div>
    </div>
  );
}
