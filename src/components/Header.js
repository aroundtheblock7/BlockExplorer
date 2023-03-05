import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [address, setAddress] = useState(null);
  function handleChangeInput(e) {
    setAddress(e.target.value);
  }

  const cleanBar = (e) => {
    e.target.parentElement.previousElementSibling.value = "";
  };

  useEffect(() => {
    setAddress(null);
  }, []);

  return (
    <header>
      <Link to={"/"} className="title">
        Ethereum Block Explorer
      </Link>
      <div className="searchbar-container">
        <input
          onChange={(e) => handleChangeInput(e)}
          placeholder="Search address"
        ></input>
        <Link to={"/accounts/" + address} onClick={(e) => cleanBar(e)}>
          <button>Search</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;