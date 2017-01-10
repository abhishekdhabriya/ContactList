import React from "react";
import Spinner from "./common/Spinner";
import FontAwesome from "react-fontawesome";


function getJSX(props) {

  const {contact, showSpinner, contactEditClickHandler} = props;

  let jsxToSend;

  if (showSpinner == true) {
    jsxToSend = <Spinner showSpinner={showSpinner}> ..... Loading data</Spinner>;
  } else if (contact == "") {
    jsxToSend = <p>Please click on a contact to see detail info</p>
  } else {
    jsxToSend = <div><img /><h4>{contact.name}</h4><h5>{contact.email}</h5><h5>{contact.phone}</h5><a
      onClick={e => contactEditClickHandler(contact, e)}><FontAwesome className="contact-detail-edit-pencil"
                                                                      name="pencil-square-o" size="2x"/></a></div>;
  }
  return jsxToSend;
}

// pure stateless function
function ContactDetail(props) {

  return (
    <div>{getJSX(props)}</div>
  );
}
export default ContactDetail;
