import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Header from "./common/Header";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import ContactForm from "./ContactForm";
import DataService from "../services/DataService";


// Top level, stateful component, implementing business logic and updating state, model .. etc..
class App extends Component {

  constructor(props) {
    super(props);

    this.dataService = new DataService;
    this._conciseContactClickHandler = this._conciseContactClickHandler.bind(this);
    this._contactSaveClickHandler = this._contactSaveClickHandler.bind(this);
    this._contactInputChangeHandler = this._contactInputChangeHandler.bind(this);
    this._contactEditClickHandler = this._contactEditClickHandler.bind(this);
  }

  /**
   * React lifecycle method
   */
  componentWillMount() {

    // set initial app state
    this.setState({
      showContactSectionSpinner: true,
      contacts: "",
      contactToEdit: "",
      contactDetail: "",
      contactSelectedId: ""
    });

    // fetch remote data

    let contactDataPromise = this.dataService.fetchAjaxData();
    contactDataPromise
      .then((data) => {
        console.log(data);
        this.setState(
          Object.assign({}, this.state, {showContactSectionSpinner: false, contacts: data})
        );
      }).catch((error) => {
      // do something about it
      console.log(error);
    });
  }

  /**
   * React lifecycle method
   */
  componentDidMount() {
    this._contactForm.focusInput();
  }

  // Click handlers 

  _conciseContactClickHandler(contact, e) {
    this.setState(
      Object.assign({}, this.state, {contactDetail: contact, contactSelectedId: contact.id})
    )
  }

  _contactSaveClickHandler(contact) {

    let savePromise;
    this.setState(
      Object.assign({}, this.state, {showContactFormSpinner: true})
    );

    if (this._isNewContact(contact)) {
      savePromise = this.dataService.create(contact);
    } else {
      savePromise = this.dataService.update(contact);
    }
    // once create or update promise resolves
    savePromise.then((response) => {

        // TODO check for response http status

        // new contact use case
        if (this._isNewContact(contact)) {
          var locationSplit = response.data.headers.location.split('/');
          contact.id = locationSplit[locationSplit.length - 1];
          let contactsFromState = this.state.contacts;
          contactsFromState.push(contact);

          this.setState(
            Object.assign({}, this.state,
              {
                contacts: contactsFromState,
                showContactFormSpinner: false,
                contactToEdit: "",
                contactDetail: contact,
                contactSelectedId: contact.id
              })
          );
          this._contactForm.reset();

        } else {

          // existing contact update use case
          let contactsCopy = this.state.contacts.slice();

          contactsCopy.forEach(c => {
            if (c.id == contact.id) {
              c.id = contact.id;
              c.name = contact.name;
              c.email = contact.email;
              c.phone = contact.phone;
            }
          });

          this.setState(
            Object.assign({}, this.state,
              {
                contacts: contactsCopy,
                showContactFormSpinner: false,
                contactToEdit : ""
              })
          );
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  _contactInputChangeHandler(e) {
    const elementName = e.target.name;
    const elementValue = e.target.value;

    var contactToEditCopy = Object.assign({}, this.state.contactToEdit);
    contactToEditCopy[e.target.name] = e.target.value;

    this.setState(
      Object.assign({}, this.state, {contactToEdit: contactToEditCopy})
    );
  }

  _contactEditClickHandler(contact, e) {
    this.setState(
      Object.assign({}, this.state, {contactToEdit: contact})
    );
  }

  render() {
    return (
      <div>
        <Header title="Awesome React"></Header>
        <Grid>
          <Row>
            <Col md={4}>
              <div className="contact-summary">
                <fieldset>
                  <legend>Contacts:</legend>
                  <ContactList showSpinner={this.state.showContactSectionSpinner} contacts={this.state.contacts}
                               contactClickHandler={this._conciseContactClickHandler}
                               contactSelectedId={this.state.contactSelectedId}/>
                </fieldset>
              </div>
            </Col>
            <Col md={8}>
              <Row>
                <div className="contact-detail">
                  <fieldset>
                    <legend>Contact Detail:</legend>
                    <ContactDetail showSpinner={this.state.showContactSectionSpinner}
                                   contact={this.state.contactDetail}
                                   contactEditClickHandler={this._contactEditClickHandler}/>
                  </fieldset>
                </div>
              </Row>
              <Row>
                <div className="add-contact-form">
                  <fieldset>
                    <legend>Add/Edit Contact:</legend>
                    <ContactForm showSpinner={this.state.showContactFormSpinner}
                                 contactSaveClickHandler={this._contactSaveClickHandler}
                                 contact={this.state.contactToEdit}
                                 contactInputChangeHandler={this._contactInputChangeHandler}
                                 ref={form => this._contactForm = form}/>
                  </fieldset>
                </div>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }


  _isNewContact(contact) {
    if (contact.id == undefined || contact.id == null || contact.id == "") {
      return true;
    }
  };
}

export default App;
