import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharactersList";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="navbar__logo">
      <img src="/images/logo.png" alt="logo" />
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function NavbarResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favorites({ favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Modal title="Favorites List" open={isOpen} onOpen={setIsOpen}>
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavorite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </div>
  );
}
