import React from "react";
import FontAwesome from "react-fontawesome";

function Spinner(props) {
  const {showSpinner, children} = props;
  return (
    <div>
      {showSpinner ? <FontAwesome name="spinner" size="5x" spin/> : <div></div>} {showSpinner ? props.children : ""}
    </div>
  );
}
export default Spinner;
