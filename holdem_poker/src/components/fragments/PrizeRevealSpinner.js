import React, { useEffect, useState } from "react";
import useGrpcClient from '../../contexts/grpc_client'

const PrizeRevealerSpinner = ({
  prizes,
  transitionDuration,
  repeat,
  style,
  currency,
  closeModal,
  tournament_instance_id
}) => {
  const grpc_client = useGrpcClient();
  const getNameContainerStyles = () => {
    if (showPrize) {
      return {
        opacity: 1,
        transform: `translateY(0%)`,
        transition: `transform ${transitionDuration}s cubic-bezier(0.075, 0.82, 0.165, 1), opacity ${transitionDuration *
          0.2}s ease-out`
      };
    }
    return {
      opacity: 0,
      transform: "translateY(-100%)",
      transition: "none"
    };
  };

  const [showPrize, setShowPrize] = useState(false);

  const setPrizeAsRevealed = ()  => {
    grpc_client.setPrizeAsRevealed(tournament_instance_id, console.log, console.error);
  }

  useEffect(() => {
    setTimeout(()=> {
      setShowPrize(true);
    }, 400)
    setTimeout(()=> {
      setPrizeAsRevealed();
      closeModal();
    },6600)
    //eslint-disable-next-line
  }, [])

  return (
    <div className={"getRandomPrize glow"} style={{ ...style }}>
      <div>
        <div style={getNameContainerStyles()}>
          {new Array(repeat)
            .fill(prizes)
            .flat()
            .map((n, i) => (
              <div
                key={i + n}
                className={i === 0 ? "prize-blink" : ""}
                style={{ padding: "20px 0px" }}
              >
                <div className='prize-div'> 
                  {currency}
                  {n}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PrizeRevealerSpinner);
