import "./App.css";
import Navbar, { Favorites, NavbarResult, Search } from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const isAddedToFavorite = favorites.map((fav) => fav.id).includes(selectedId);

  const handleSelectCharacter = (id) =>
    setSelectedId((prevId) => (prevId === id ? null : id));

  const handleAddFavorite = (char) =>
    setFavorites((prevFav) => [...prevFav, char]);

  const handleDeleteFavorite = (id) =>
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NavbarResult numOfResult={characters.length} />
        <Favorites
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorite}
        />
      </Navbar>
      <Main>
        <CharactersList
          characters={characters}
          isLoading={isLoading}
          selectedId={selectedId}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddedToFavorite={isAddedToFavorite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
