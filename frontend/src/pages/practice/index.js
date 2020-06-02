import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser'; 

import deckManager from "../../services/connection";
import Header from "../../components/header";

import "./styles.css";

export default function Practice(props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  var [cardsData, setCardsData] = useState([]);
  const { deckId, limit_new_cards, limit_old_cards } = props.location;
  const title = props.match.params.deckName;

  useEffect(() => {
    async function fetchData() {
      const response = await getCards(deckId, limit_new_cards, limit_old_cards);

      let arr = response.map(({id, front_side, back_side, is_new, logx, logy}) => {
        return {
          id,
          front_side,
          back_side,
          is_new,
          log: [logx, logy]
        }
      })

      setCardsData(arr);

      setIsLoading(false);
    }
    fetchData();
  }, [deckId, limit_new_cards, limit_old_cards]);

  async function getCards(deckId, limit_new_cards, limit_old_cards) {
    const response = await deckManager.getCards(
      deckId,
      limit_new_cards,
      limit_old_cards
    );

    return response;
  }

  function setOption(opt) {
    const options = {
      nHard() {
        let positionsLeft = cardsData.length;

        if (positionsLeft <= 3) {
          cardsData.push(cardsData[0]);
        } else {
          let newArr = [
            ...cardsData.slice(0, 3),
            cardsData[0],
            ...cardsData.slice(3),
          ];

          cardsData = [...newArr];
        }

        return null;
      },

      nGood() {
        let card = cardsData[0];
        card["log"] = [0, 1];

        cardsData.push(card);

        return null;
      },

      nEasy() {
        return [1, 1];
      },

      hard(log) {
        return [log[0], log[1]];
      },

      good(log) {
        return [log[1], log[0] + log[1]];
      },

      easy(log) {
        return [log[0] + log[1], log[0] + log[1] + log[1]];
      },
    };

    let log = [...cardsData[0]["log"]];

    let newLog = options[opt](log);

    if (newLog !== null) {
      async function submitCard() {
        await submitResponse(newLog);

        setCardsData(cardsData.slice(1));
      }
      submitCard();
    } else {
      setCardsData(cardsData.slice(1));
    }
    setShowAnswer(!showAnswer);
  }

  async function submitResponse(log) {
    const { id } = cardsData[0];
    
    await deckManager.updateCard(
      deckId,
      id,
      log[0],
      log[1]
    )

    return;
  }

  return (isLoading || cardsData.length === 0) ?
  (
    <div className="wrapperEl">
        <Header title={title} activity="Practice"/>
        <div
          style={{
            height: "100vh",
            width: "100%",
            paddingTop: "10vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>Finished, no more cards today.</h1>
          <p>We're going to await you for tomorrow daily pratice :D</p>
        </div>
      </div>
  ):
  (
    <div className="wrapperEl">
      <Header title={title} activity="Practice" />
      <div className="manageCardsContainerEl">
        <div className="frontCardEl cardEl">
          <h1>Front</h1>
          <div id="frontCardOutputEl">{ReactHtmlParser(cardsData[0]["front_side"])}</div>
        </div>
        <div className="backCardEl cardEl">
          <h1>Back</h1>
          <div id="backCardOutputEl">
            {showAnswer && <div>{ReactHtmlParser(cardsData[0]["back_side"])}</div>}
          </div>
        </div>
        <div className="optionsPracticeCardEl">
          {showAnswer ? (
            cardsData[0]["is_new"] ? (
              cardsData[0]["log"][1] === null ? (
                <div>
                  <button onClick={() => setOption("nHard")}>
                    1min
                    <br />
                    nHard
                  </button>
                  <button onClick={() => setOption("nGood")}>
                    10min
                    <br />
                    nGood
                  </button>
                  <button onClick={() => setOption("nEasy")}>
                    1d
                    <br />
                    nEasy
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => setOption("nHard")}>
                    10min
                    <br />
                    nHard
                  </button>
                  <button onClick={() => setOption("good")}>
                    1d
                    <br />
                    nGood
                  </button>
                  <button onClick={() => setOption("easy")}>
                    2d
                    <br />
                    nEasy
                  </button>
                </div>
              )
            ) : (
              <div>
                <button onClick={() => setOption("nGood")}>
                  10min
                  <br />
                  reset
                </button>
                <button onClick={() => setOption("hard")}>
                  {cardsData[0]["log"][1]}d
                  <br />
                  Hard
                </button>
                <button onClick={() => setOption("good")}>
                  {cardsData[0]["log"][0] + cardsData[0]["log"][1]}d
                  <br />
                  Good
                </button>
                <button onClick={() => setOption("easy")}>
                  {cardsData[0]["log"][0] + 2 * cardsData[0]["log"][1]}d
                  <br />
                  Easy
                </button>
              </div>
            )
          ) : (
            <div>
              <button onClick={() => setShowAnswer(!showAnswer)}>
                showAnswer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
