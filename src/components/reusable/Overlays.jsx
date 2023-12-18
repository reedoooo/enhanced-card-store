import { Fragment } from 'react';

import './Overlay.css';

export function ultraRareOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}

export function quarterCenturyOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}

export function ultimateRareOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}

export function secretRareOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}

export function superRareOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}

export function rareOL({ isOpen, children }) {
  return (
    <Fragment>{isOpen && <div className="overlay">{children}</div>}</Fragment>
  );
}
