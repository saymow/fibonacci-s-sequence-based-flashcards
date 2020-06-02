import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useHistory, Link } from "react-router-dom";

import DarkModeBtn from "../switchButton";

import "./styles.css";

export default function Header(props) {
  const { signOut } = useAuth();
  const { title, activity } = props;
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleMenuToggle() {
    const carouselEl = document.querySelector(".mainCarouselEl");
    const cardsEl = document.querySelectorAll(".cardEl");

    setToggleMenu(!toggleMenu);

    if (carouselEl) return carouselEl.classList.toggle("underlayEl");
    if (cardsEl)
      return cardsEl.forEach((card) => card.classList.toggle("underlayEl"));
  }

  function handleSignOut() {
    history.push("/login");
    signOut();
  }

  return (
    <header>
      <div className="headerPagesEl">
        <ul>
          <Link to={{ pathname: "/" }}>
            <li>Decks</li>
          </Link>
          {activity && <div>{activity}</div>}
          {title && <div>{title}</div>}
        </ul>
      </div>
      <div className="headerOptionsEl">
        <div className={toggleMenu ? "menu-section on" : "menu-section"}>
          <ul>
            {!title && (
              <div className="switchDivEl">
                <DarkModeBtn />
              </div>
            )}
            <Link to={{ pathname: "/change_password" }}>
              <li>Change password</li>
            </Link>
            <li onClick={handleSignOut}>Logout</li>
          </ul>

          <div onClick={handleMenuToggle} className="menu-toggle">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}
