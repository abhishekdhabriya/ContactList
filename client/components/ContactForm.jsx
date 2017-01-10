import React, {Component} from "react";
import Spinner from "./common/Spinner";

class ContactForm extends Component {

  constructor(props) {
    super(props);

    this._contactSaveClickHandler = this._contactSaveClickHandler.bind(this);
    this._updateInputValue = this._updateInputValue.bind(this);
  }

  /**
   * public method. Can be called from outside (parent or top level component)
   */
  focusInput() {
    this._contactNameElement.focus();
  }

  /**
   * public methods. Can be called from outside
   */
  reset() {
    // reset all the input values.
    this._contactNameElement.value = "";
    this._contactEmailElement.value = "";
    this._contactPhoneElement.value = "";
    this._contactIdElement.value = "";
  }

  /**
   * private method. should not be called from outside
   * @param e
   * @private
   */
  _contactSaveClickHandler(e) {
    e.preventDefault();
    const name = this._contactNameElement.value.trim(); // this.contactElement is a actual DOM node/element.
    const email = this._contactEmailElement.value.trim();
    const phone = this._contactPhoneElement.value.trim();
    const id = this._contactIdElement.value.trim();

    var contactInfo = {
      id,
      name,
      email,
      phone
    };
    this.props.contactSaveClickHandler(contactInfo);  // calling top level component function
  }

  _updateInputValue (e) {
    this.props.contactInputChangeHandler(e);
  }

  render() {
    return (
      <div className="form-box">
        <form className="form-horizontal" onSubmit={this._contactSaveClickHandler}>
          <Spinner showSpinner={this.props.showSpinner}> ..... Saving data</Spinner>
          <div className="form-group row">
            <label htmlFor="contactName" className="col-md-2 col-form-label">Name</label>
            <div className="col-md-10">
              <input type="test" id="contactName" name="name" className="form-control" value={this.props.contact.name} onChange={this._updateInputValue}
                     ref={input => this._contactNameElement = input} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="contactEmail" className="col-md-2 col-form-label">Email</label>
            <div className="col-md-10">
              <input type="email" id="contactEmail" name="email" className="form-control" value={this.props.contact.email} onChange={this._updateInputValue}
                     ref={input => this._contactEmailElement = input} disabled={this.props.showSpinner}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="contactPhone" className="col-md-2 col-form-label">Phone</label>
            <div className="col-md-10">
              <input type="text" id="contactPhone" name="phone" className="form-control" value={this.props.contact.phone} onChange={this._updateInputValue}
                     ref={input => this._contactPhoneElement = input} disabled={this.props.showSpinner}/>
            </div>
          </div>
          <input type="hidden" id="hidden_id" value={this.props.contact.id} ref={input => this._contactIdElement = input}/>

          <div className="form-group row">
            <div className="col-md-10 col-md-offset-2">
              <input type="submit" value="Save" className="btn btn-blue" disabled={this.props.showSpinner}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  contactSaveClickHandler: React.PropTypes.func.isRequired,
  contactInputChangeHandler: React.PropTypes.func.isRequired
};

export default ContactForm;
