import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Account from "./components/Account";
import Transaction from "./components/Transaction";
import Block from "./components/Block";
import Header from "./components/Header";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setLatestBlocks] = useState(null);
  const [txs, setLatestTxs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const block = await alchemy.core.getBlockNumber();
      setBlockNumber(block);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                blockNumber={blockNumber}
                alchemy={alchemy}
                blocks={blocks}
                setLatestBlocks={setLatestBlocks}
                txs={txs}
                setLatestTxs={setLatestTxs}
              />
            }
          />
          <Route
            path="/block/:url"
            element={<Block blockNumber={blockNumber} alchemy={alchemy} />}
          />
          <Route
            path="/transactions/:url"
            element={<Transaction alchemy={alchemy} />}
          />
          <Route
            path="/accounts/:url"
            element={<Account alchemy={alchemy} />}
          />
        </Routes>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
