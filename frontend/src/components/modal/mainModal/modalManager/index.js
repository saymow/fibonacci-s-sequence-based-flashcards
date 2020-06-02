import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ModalDefault from "../createModal";
import Defaultdialog from "../../../dialog";

import "./styles.css";

export const CreateDeck = forwardRef((props, ref) => {
  const modalRef = useRef();
  const [deckName, setDeckName] = useState("");
  const [limitOldCards, setLimitOldCards] = useState(5);
  const [limitNewCards, setLimitNewCards] = useState(5);
  const renderDeckList = props.render;
  const { apiCreateDeck } = props;

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  const openModal = () => modalRef.current.openModal();
  const closeModal = () => modalRef.current.closeModal();

  async function submitHandler(event) {
    event.preventDefault();
    await apiCreateDeck(deckName, limitNewCards, limitOldCards);

    setDeckName("");
    setLimitNewCards(5);
    setLimitOldCards(5);

    closeModal();
    renderDeckList();
  }

  return (
    <ModalDefault ref={modalRef}>
      <form className="deckFormEl" onSubmit={submitHandler}>
        <div className="createDeckDivEl">
          <input
            name="name"
            placeholder="Deck's title"
            maxLength="15"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
        </div>
        <div className="createDeckDivEl">
          <p>Daily limit review:</p>
          <select
            id="dailyReviews"
            data-tooltip="Old ones"
            value={limitOldCards}
            onChange={(e) => setLimitOldCards(e.target.value)}
          >
            <option disabled>Old ones</option>
            <option value={5}>5 Cards</option>
            <option value={10}>10 Cards</option>
            <option value={15}>15 Cards</option>
            <option value={20}>20 Cards</option>
            <option value={30}>30 Cards</option>
          </select>
          <select
            id="newReviews"
            data-tooltip="New ones"
            value={limitNewCards}
            onChange={(e) => setLimitNewCards(e.target.value)}
          >
            <option disabled>New ones</option>
            <option value={5}>5 Cards</option>
            <option value={10}>10 Cards</option>
            <option value={15}>15 Cards</option>
            <option value={20}>20 Cards</option>
            <option value={30}>30 Cards</option>
          </select>
        </div>
        <button>Create</button>
      </form>
    </ModalDefault>
  );
});

export const ManageDeck = forwardRef((props, ref) => {
  const modalRef = useRef();
  const [deckId, setDeckId] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [limitOldCards, setLimitOldCards] = useState("");
  const [limitNewCards, setLimitNewCards] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const renderDeckList = props.render;
  const { apiManageDeck, apiDeleteDeck } = props;

  async function deletehandler() {
    console.log(`Delete deck id: ${deckId}`);
    await apiDeleteDeck(deckId);
    closeModal();
    renderDeckList();
  }

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  const openModal = (id, title, limitN, limitO) => {
    setDeckName(title);
    setLimitNewCards(limitN);
    setLimitOldCards(limitO);
    setDeckId(id);
    modalRef.current.openModal();
  };
  const closeModal = () => modalRef.current.closeModal();

  async function submitHandler(event) {
    event.preventDefault();

    console.log(limitOldCards, limitNewCards, deckName);

    await apiManageDeck(deckId, deckName, limitNewCards, limitOldCards);

    /*REGISTRING A NEW DECK*/

    closeModal();
    renderDeckList();
  }

  return (
    <ModalDefault ref={modalRef} onSubmit={submitHandler}>
      <form className="deckFormEl" id="deckManager" onSubmit={submitHandler}>
        <div className="createDeckDivEl">
          <input
            name="name"
            placeholder="Deck's title"
            maxLength="20"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
        </div>
        <div className="createDeckDivEl">
          <p>Daily limit review:</p>
          <select
            id="dailyReviews"
            data-tooltip="Old ones"
            value={limitOldCards}
            onChange={(e) => setLimitOldCards(e.target.value)}
          >
            <option disabled>Old ones</option>
            <option value="5">5 Cards</option>
            <option value="10">10 Cards</option>
            <option value="15">15 Cards</option>
            <option value="20">20 Cards</option>
            <option value="30">30 Cards</option>
          </select>
          <select
            id="newReviews"
            data-tooltip="New ones"
            value={limitNewCards}
            onChange={(e) => setLimitNewCards(e.target.value)}
          >
            <option disabled>New ones</option>
            <option value="5">5 Cards</option>
            <option value="10">10 Cards</option>
            <option value="15">15 Cards</option>
            <option value="20">20 Cards</option>
            <option value="30">30 Cards</option>
          </select>
        </div>
        <button>OK</button>
        <RiDeleteBinLine
          id="deleteIcon"
          size={"25px"}
          onClick={() => setOpenDialog(true)}
        />

        {openDialog && (
          <Defaultdialog
            yesButton="Delete"
            toggleDialog={setOpenDialog}
            Action={deletehandler}
            title="Are you sure you want to delete this card?"
            description={
              <p>
                for security reasons, this card will be deleted definitely just
                after <span>1 day</span>. So, you can retrieve it until then.
              </p>
            }
          />
        )}
      </form>
    </ModalDefault>
  );
});

export const CancelDeleteDeck = forwardRef((props, ref) => {
  const [deckId, setDeckId] = useState();
  const [dialog, setOpenDialog] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState(0);
  const { apiRetrieveDeck, render } = props;

  async function retrieveHandler() {
    await apiRetrieveDeck(deckId);
    render();
  }

  useEffect(() => {
    if (dialog) {
      countDown();
      setInterv(setInterval(countDown, 1000));
    } else {
      clearInterval(interv);
    }
    // useMemo probably would resolve this problem.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog]);

  const countDown = () => {
    let newDate = new Date(deadline - Date.now(0));
  
    // getUTCHours instead of getHours because it bypasses any timezone offset
    let h = String(newDate.getUTCHours());
    let m = String(newDate.getMinutes());
    let s = String(newDate.getSeconds());
      
    setTimer({
      h: h.length === 1 ? "0" + h : h,
      m: m.length === 1 ? "0" + m : m,
      s: s.length === 1 ? "0" + s : s,
    });
  }

  useImperativeHandle(ref, () => {
    return {
      openDialog,
    };
  });

  const openDialog = (id, timestamp) => {
    const dateInstance = new Date(Date.parse(timestamp));

    setDeadline(dateInstance);

    setDeckId(id);
    setOpenDialog(true);
  };

  return (
    <>
      {dialog && (
        <Defaultdialog
          yesButton="Retrieve"
          toggleDialog={setOpenDialog}
          Action={retrieveHandler}
          title="Do you wish retrieve this deck?"
          description={
            <p>
              This card will be deleted in
              <span
                style={{ display: "block", fontSize: "2.5rem" }}
              >{`${timer.h}:${timer.m}:${timer.s}`}</span>
            </p>
          }
        />
      )}
    </>
  );
});
