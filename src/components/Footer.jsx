import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Ryan Lemon ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
