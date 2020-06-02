import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./../../components/header";
import {
  CreateDeck,
  ManageDeck,
  CancelDeleteDeck,
} from "./../../components/modal/mainModal/modalManager";
import deckManager from "../../services/connection";

import "./styles.css";

export default function Main(param) {
  const [deckList, setDeckList] = useState([]);
  const createDeckModalRef = useRef();
  const manageDeckModalRef = useRef();
  const cancelDeleteDeckModalRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  /* false was an arbitrary choice, as soon it changes its value, will have an api request.*/
  const [mustRender, setMustRender] = useState(false);

  // PROVISORY, TODO
  const settings = {
    speed: 500,
    slidesToScroll: 1,
    className: "mainCarouselEl",
    focusOnSelect: true,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await deckManager.getDecks();


      let arr = response
        .map(
          ({
            id,
            title,
            limit_new_cards,
            limit_old_cards,
            deleted,
            total_cards,
            new_cards,
            due_cards,
          }) => {
            return {
              id,
              title,
              img: "https://picsum.photos/280/160",
              total_cards,
              new_cards:
                new_cards > limit_new_cards ? limit_new_cards : new_cards,
              due_cards:
                due_cards > limit_old_cards ? limit_old_cards : due_cards,
              deleted: deleted ? deleted : false,
              limit_new_cards,
              limit_old_cards,
            };
          }
        )
        .sort((a, b) => b.total_cards - a.total_cards);

      console.log(response)

      setDeckList(arr);

      setIsLoading(false);
    }

    fetchData();
  }, [mustRender]);

  const deckEl = deckList.map((deck, index) => {
    return (
      <section
        key={index}
        className={`${deck.deleted ? "deleted deckEl" : "deckEl"}`}
      >
        <div
          className="deckImgDivEl"
          style={{ background: `url(${deck.img})` }}
        ></div>
        <div className="deckInfoEl">
          <h1>{deck.title}</h1>
          <p>
            Total cards: <span>{deck.total_cards}</span>
          </p>
          {deck.deleted ? (
            <div className="unableDeckBtnEl">
              <button className="noHover">Disabled</button>
            </div>
          ) : (
            <div className="ableDeckBtnEl">
              <Link
                to={{
                  pathname: `addCards/${deck.title}`,
                  deckId: deck.id,
                }}
              >
                <button>Add cards</button>
              </Link>
              <Link
                to={{
                  pathname: `practice/${deck.title}`,
                  deckId: deck.id,
                  limit_new_cards: deck.limit_new_cards,
                  limit_old_cards: deck.limit_old_cards,
                }}
              >
                <button id="practiceBtnEl">Practice</button>
              </Link>
            </div>
          )}
          <BsGearFill
            className={deck.deleted ? "gearDeckDeleted" : "deckGearEl"}
            size={deck.deleted ? 70 : 20}
            onClick={() =>
              deck.deleted
                ? cancelDeleteDeckModalRef.current.openDialog(
                    deck.id,
                    deck.deleted
                  )
                : manageDeckModalRef.current.openModal(
                    deck.id,
                    deck.title,
                    deck.limit_new_cards,
                    deck.limit_old_cards
                  )
            }
          />
        </div>
        <div className="deckCurrentInfoEl">
          <div>
            <p>Today cards</p>
            <span>{deck.due_cards}</span>
          </div>
          <div>
            <p>New cards</p>
            <span>{deck.new_cards}</span>
          </div>
        </div>
      </section>
    );
  });

  return isLoading ? (
    ""
  ) : deckEl.length !== 0 ? (
    <div id="wrapperEl">
      <CreateDeck
        ref={createDeckModalRef}
        render={() => setMustRender(!mustRender)}
        apiCreateDeck={deckManager.createDeck}
      />
      <ManageDeck
        ref={manageDeckModalRef}
        render={() => setMustRender(!mustRender)}
        apiManageDeck={deckManager.manageDeck}
        apiDeleteDeck={deckManager.deleteDeck}
      />
      <CancelDeleteDeck
        ref={cancelDeleteDeckModalRef}
        render={() => setMustRender(!mustRender)}
        apiRetrieveDeck={deckManager.retrieveDeck}
      />
      <Header></Header>
      <div className="mainContainerEl">
        <div
          className="createDeckEl"
          onClick={() => createDeckModalRef.current.openModal()}
        >
          <img
            src="https://svgsilh.com/svg/1270001.svg"
            alt="Create a deck."
          ></img>
        </div>
        <Slider {...settings}>{deckEl}</Slider>
      </div>
    </div>
  ) : (
    <div id="wrapperEl">
      <CreateDeck
        ref={createDeckModalRef}
        render={() => setMustRender(!mustRender)}
        apiCreateDeck={deckManager.createDeck}
      />
      <Header></Header>
      <div className="noDecksContainerEl">
        <div>Try out create your very first deck</div>
        <div
          className="createDeckEl"
          onClick={() => createDeckModalRef.current.openModal()}
        >
          <img
            src="https://svgsilh.com/svg/1270001.svg"
            alt="Create a deck."
          ></img>
        </div>
      </div>
    </div>
  );
}
