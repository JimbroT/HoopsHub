import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  link,
  external
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const buttonClass = `btn ${checkButtonStyle} ${checkButtonSize}`;

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        onClick={onClick}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        {children}
      </a>
    );
  } else if (link) {
    return (
      <Link to={link} className="btn-mobile">
        <button
          className={buttonClass}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={buttonClass}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
};
