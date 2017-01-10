import Axios from 'axios';

export default class DataService {

  constructor () {
     this._axios =  Axios;
     this._mockContactData = this.fetchContactData();
  }


  fetchAjaxData() {
    return this._axios.get('http://localhost:3001/api/contacts')
      .then((response) => {
         console.log(response);
         return response.data;
      })
      .catch((error) => {
         console.log(error);
      });
  }


  create(contact){
    return this._axios.post('http://localhost:3001/api/contacts', contact)
     .then((response) => {
           return response
     }).catch((error) => {
         console.log(error);
     });
  }

  update(contact){
    return this._axios.put(`http://localhost:3001/api/contacts/${contact.id}`, contact)
      .then((response) => {
         return response
      }).catch((error) => {
        console.log(error);
      });
  }

  fetchAjaxDataMock() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this._mockContactData);
        }, 5000);
    });
  }

  fetchContactData() {
    let contactsData = [{
      id: 1,
      name: 'Rachel Green',
      email: 'rachel.green@gmail.com',
      phone: '888-123-5676'
    }, {
      id: 2,
      name: 'Monica Geller',
      email: 'monica.geller@gmail.com',
      phone: '777-123-5676'
    }, {
      id: 3,
      name: 'Joey Tribbiani',
      email: 'joey.tribbiani@gmail.com',
      phone: '666-123-5676'
    }, {
      id: 4,
      name: 'Chandler Bing',
      email: 'chandler.bing@gmail.com',
      phone: '555-123-5676'
    }, {
      id: 5,
      name: 'Ross Geller',
      email: 'ross.geller@gmail.com',
      phone: '444-123-5676'
    }, {
      id: 6,
      name: 'Phoebe Buffay',
      email: 'phoebe.buffay@gmail.com',
      phone: '333-123-5676'
    }];

    return contactsData;
  }
}


