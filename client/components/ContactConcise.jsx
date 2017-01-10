import React from "react";


function ContactConcise(props) {
  const {contact, contactClickHandler, contactSelectedId} = props; // this is a destructuring ES 6 syntax where we are extracting contact from this.props.contact and making it a constant.
  return (
    <div>
      <a className={contact.id == contactSelectedId ? 'contact-selected' : ''} onClick={e => contactClickHandler(contact, e)}>
        <h4>{contact.name}</h4>

      </a>
    </div>
  );
}
export default ContactConcise;
