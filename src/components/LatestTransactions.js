import { useEffect } from "react";
import { Link } from "react-router-dom";

function LatestTransactions({ block, alchemy, txs, setLatestTxs }) {
  useEffect(() => {
    const fetchData = async () => {
      const latestBlock = await alchemy.core.getBlockWithTransactions(block);
      setLatestTxs(latestBlock.transactions.slice(0, 10));
    };

    if (!txs) {
      fetchData();
    }
  }, [alchemy.core, block, setLatestTxs, txs]);

  return (
    <div className="latest-container">
      <div className="card-header">Latest Transactions</div>
      <div className="row-container">
        {txs ? (
          txs.map((tx, i) => {
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
                        <span className="link">{tx.to.substring(0, 11)}</span>
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
          })
        ) : (
          <div className="row">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default LatestTransactions;