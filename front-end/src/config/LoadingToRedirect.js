import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

function LoadingToRedirect({ path }) {
  const [count, setCount] = React.useState(5);
  let history = useHistory();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push(path);
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="modal">
      <div className="modal-container">
        <img
          alt="loader"
          src={"https://firebasestorage.googleapis.com/v0/b/storeage-9a11b.appspot.com/o/loader.svg?alt=media&token=aa22ec51-5f1f-4761-ae36-f358511178ef"}
        />
        <h1 className="text-redirect">
          Redirecting you in <b className="text-counter">{count}</b> seconds
        </h1>
      </div>
    </div>
  );
}

export default LoadingToRedirect;
