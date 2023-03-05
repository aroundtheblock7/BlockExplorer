import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function LatestBlocks({ block, alchemy, blocks, setLatestBlocks }) {
  const componentMounted = useRef(true);

  useEffect(() => {
    let blocksArray = [];
    const fetchData = async () => {
      for (let i = 0; i < 10; i++) {
        const latestBlock = await alchemy.core.getBlock(block - i);
        blocksArray.push(latestBlock);
      }
      if (componentMounted.current) {
        setLatestBlocks(blocksArray);
      }
    };

    if (!blocks) {
      fetchData();
    }

    return () => {
      componentMounted.current = false;
    };
  }, [alchemy.core, block, blocks, setLatestBlocks]);

  return (
    <div className="latest-container">
      <div className="card-header">Latest Blocks</div>
      <div className="row-container">
        {blocks ? (
          blocks.map((block, i) => {
            return (
              <div className="row" key={i}>
                <Link to={"/block/" + block.number}>
                  <div className="link">{block.number}</div>
                </Link>
                <div>
                  Miner:{" "}
                  <Link to={"accounts/" + block.miner}>
                    <span className="link">
                      {block.miner.substring(0, 11)}...
                    </span>
                  </Link>
                </div>
                <div className="value">{block.transactions.length} txns</div>
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

export default LatestBlocks;