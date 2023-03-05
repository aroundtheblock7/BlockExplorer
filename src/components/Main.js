import LatestTransactions from "./LatestTransactions";

import LatestBlocks from "./LatestBlocks";

function Main({
  blockNumber,
  alchemy,
  blocks,
  setLatestBlocks,
  txs,
  setLatestTxs,
}) {
  return (
    <div className="info-container">
      {blockNumber && (
        <>
          <LatestBlocks
            block={blockNumber}
            alchemy={alchemy}
            blocks={blocks}
            setLatestBlocks={setLatestBlocks}
          />{" "}
          <LatestTransactions
            block={blockNumber}
            alchemy={alchemy}
            txs={txs}
            setLatestTxs={setLatestTxs}
          />
        </>
      )}
    </div>
  );
}

export default Main;