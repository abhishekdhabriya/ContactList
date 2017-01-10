import React, {Component} from "react";
import ContactConcise from "./ContactConcise";


function createConciseContact(contact, contactClickHandler, contactSelectedId) {
  return (
    <ContactConcise key={contact.id} contact={contact} contactClickHandler={contactClickHandler}
                    contactSelectedId={contactSelectedId}/>
  );
}

function Contacts(props) {
  let conciseContactItems;
  const {contacts, contactClickHandler, contactSelectedId} = props;   // ES2015 destructuring
  if (contacts) {
    conciseContactItems = contacts.map((contact) => {
      return createConciseContact(contact, contactClickHandler, contactSelectedId);
    });
  }

  return (
    <div>
      {conciseContactItems}
    </div>
  );
}
export default Contacts;
