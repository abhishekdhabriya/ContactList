import React from "react";
import Contacts from "./Contacts";
import Spinner from "./common/Spinner";

// stateless component. takes in props and returns JSX
function ContactList(props) {
  const {contacts, contactClickHandler, showSpinner, contactSelectedId} = props;

  return (
    <div>
      {showSpinner == true ? <Spinner showSpinner={showSpinner}> ..... Loading data</Spinner> :
        <Contacts contacts={contacts} contactClickHandler={contactClickHandler} contactSelectedId={contactSelectedId}/>}
    </div>
  );
}
export default ContactList;
