import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const timeInSeconds = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });
    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost ? <h2>You lost</h2> : <h2>Your Score is {score}</h2> }
        <p>
          The target time was <strong>{targetTime} seconds </strong>
        </p>
{  userLost ?  <p>Failed to stop the Time </p> : <p>
          you stopped the timer with
          <strong> {timeInSeconds} seconds left</strong>
        </p>  }
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
