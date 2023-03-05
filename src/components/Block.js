import { Utils } from "alchemy-sdk";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Block({ blockNumber, alchemy }) {
  const { url } = useParams();
  const [block, setBlock] = useState(null);

  function toggleTx(e) {
    const collapsible = e.target.nextElementSibling;
    if (collapsible.style.display === "flex") {
      collapsible.style.display = "none";
    } else {
      collapsible.style.display = "flex";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const blockResponse = await alchemy.core.getBlockWithTransactions(
        parseInt(url)
      );
      setBlock(blockResponse);
    };
    fetchData();
  }, [alchemy.core, url]);

  return (
    <div>
      {!block ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="block-title">
            <div>Block #{block.number}</div>
            <div className="buttons-container">
              <Link to={"/block/" + (block.number - 1)}>
                <button>Previous</button>
              </Link>
              <Link to={"/block/" + (block.number + 1)}>
                <button>Next</button>
              </Link>
            </div>
          </div>
          <div className="tx-block-container">
            <div className="block-row">
              <span>Fee Recipient</span>
              <Link to={"/accounts/" + block.miner}>{block.miner}</Link>
            </div>
            <div className="block-row">
              <span>Timestamp</span> {block.timestamp}
            </div>
            <div className="block-row">
              <span>Gas Used:</span> {block.gasUsed.toString()}
            </div>
            <div className="block-row">
              <span>Gas Limit:</span> {block.gasLimit.toString()}
            </div>
            <div className="block-row">
              <span>Base Fee Per Gas:</span>
              {Utils.formatEther(block.baseFeePerGas.toString())} ETH
            </div>
            <div className="block-row">
              <span>Hash:</span> {block.hash}
            </div>
            <div className="block-row">
              <span>Parent Hash: </span>
              <Link to={"/block/" + (block.number - 1)}>
                {block.parentHash}
              </Link>
            </div>
            <div className="tx-per-block" onClick={(e) => toggleTx(e)}>
              Transactions: {block.transactions.length}
            </div>
            <div className="collapsible">
              {block.transactions.map((tx, i) => {
                return (
                  <div className="row" key={i}>
                    <Link to={"/transactions/" + tx.hash}>
                      <div className="link">{tx.hash.substring(0, 11)}...</div>
                    </Link>
                    <div>
                      <div>
                        From{" "}
                        <Link to={"/accounts/" + tx.from}>
                          <span className="link">
                            {tx.from.substring(0, 11)}...
                          </span>
                        </Link>
                      </div>
                      <div>
                        To{" "}
                        <Link to={"/accounts/" + tx.to}>
                          {tx.to === null ? (
                            <div className="link">0x000000000</div>
                          ) : (
                            <span className="link">
                              {tx.to.substring(0, 11)}
                            </span>
                          )}
                          ...
                        </Link>
                      </div>
                    </div>
                    <div className="value">
                      {tx.value.toString() !== "0"
                        ? (tx.value.toString() / 10 ** 18).toFixed(5)
                        : tx.value.toString() / 10 ** 18}{" "}
                      ETH
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Block;