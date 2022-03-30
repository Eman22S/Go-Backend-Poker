import React, { useEffect } from "react";

const TimesUp = ({
  children,
  closeModal,
  style
}) => {


  useEffect(() => {
    setTimeout(()=> {
      closeModal();
    }, 3000)
  }, [closeModal])

  return (
    <div className={"glow"} style={{ ...style }}>
      { children }
    </div>
  );
};

export default React.memo(TimesUp);
