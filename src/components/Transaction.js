import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Transaction({ alchemy }) {
  const { url } = useParams();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const txReceipt = await alchemy.core.getTransactionReceipt(url);
      setTx(txReceipt);
    };
    fetchData();
  }, [alchemy.core, url]);

  return (
    <div>
      {!tx ? (
        <div className="tx-block-container">Loading...</div>
      ) : (
        <>
          <div className="tx-block-container">
            <div className="block-row">
              <span>Hash:</span> {tx.transactionHash}
            </div>
            <div className="block-row">
              <span>From:</span>{" "}
              <Link to={"/accounts/" + tx.from}>{tx.from}</Link>
            </div>
            <div className="block-row">
              <span>To:</span> <Link to={"/accounts/" + tx.to}>{tx.to}</Link>
            </div>
            <div className="block-row">
              <span>Block:</span>
              <Link to={"/block/" + tx.blockNumber}>{tx.blockNumber}</Link>
              <div className="block-confirmations">
                {tx.confirmations} Block Confirmations
              </div>
            </div>
            <div className="block-row">
              <span>Status:</span> {tx.status}
            </div>
            <div className="block-row">
              <span>Gas Used:</span> {tx.gasUsed.toString()} Wei
            </div>
            <div className="block-row">
              <span>Cumulative Gas Used:</span>{" "}
              {parseInt(tx.cumulativeGasUsed.toString())} Wei
            </div>
            <div className="block-row">
              <span>Effective Gas Price:</span>
              {parseInt(tx.effectiveGasPrice.toString()) / 10 ** 9} Gwei
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Transaction;
