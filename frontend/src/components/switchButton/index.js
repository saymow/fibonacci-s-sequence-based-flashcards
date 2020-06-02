import React, { useEffect, useRef } from "react";

import "./styles.css";

export default function DarkModeButton() {
  const switchRef = useRef();
  const html = document.querySelector("html");

  const whiteModeColors = {
    Secondary: " rgb(230, 230, 230)",
    bg: " #fff",
    txtPrimary: " #000",
    txtSecondary: " #888"
  };

  const darkModeColors = {
    Secondary: "#555",
    bg: "#121212",
    txtPrimary: "#fff",
    txtSecondary: "#888",
  };

  useEffect(() => {
    let theme = localStorage.getItem("@Theme");

    if (theme === "Dark mode") {
      changeColors(darkModeColors);
      switchRef.current.checked = true;
    }
    // *useMemo*
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchRef]);

  function changeColors(colors) {
    Object.keys(colors).forEach((key) => {
      html.style.setProperty("--color-" + key, colors[key]);
    });
  }

  function handleSwitch() {
    if (switchRef.current.checked) {
      changeColors(darkModeColors);
      localStorage.setItem("@Theme", "Dark mode");
    } else {
      changeColors(whiteModeColors);
      localStorage.setItem("@Theme", "White mode");
    }
  }

  return (
    <label className="switch">
      <input ref={switchRef} type="checkbox" onChange={handleSwitch} />
      <span className="slider round" />
    </label>
  );
}
