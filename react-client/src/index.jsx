import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import Update from './components/Update.jsx';
import {geocode} from '@esri/arcgis-rest-geocoder';
import config from './config.js';
var Promise = require("bluebird");

var mymap;
var markers = new L.FeatureGroup();
var count = 0;
var marker;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.geo.bind(this);
    this.geoCallback.bind(this);
  }

  componentDidMount() {
    axios.get('/contacts')
    .then(response => {
      this.setState({
        items: response.data
      });
      count = 0;
      this.showMap();
    })
    .catch(error => {
        console.log('err', error);
      });
  }
  // leaflet map interface
  showMap() {
    //using OpenStreetMap, MapBox tile provider
    mymap = L.map('mapid').setView([37.787600, -122.396630], 3);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.token
    }).addTo(mymap);
    // mymap.removeLayer(marker);
    this.geo(this.geoCallback);
  }

  geo() {
    this.updateMap(this.state.items[count].address, count);
  }
  // set up a callback function so that the correct markers will be updated
  geoCallback() {
    count++;
    // console.log(count, 'line 61');
    if (count < this.state.items.length) {
      this.geo();
    } else {
      mymap.addLayer(markers);
    }
  }

  updateMap(address, cnt) {
    // console.log(address, 'line 71');
    geocode(address)
    .then((response) => {
      var location = response.candidates[0].location;
      marker = L.marker([location.y, location.x]).bindPopup(`<b>Hey, I'm ${this.state.items[cnt].name}, this is my address: ${address}</b>`).openPopup();
      markers.addLayer(marker);
      this.geoCallback();
    });
    // mymap.addLayer(markers);
  }

  // submit a post request to the server
  submitNewContact(contact) {
    axios.post('/contacts', contact)
    .then(response => {
      console.log(response.data);
      count = 0;
      this.geo(this.geoCallback);
    });
  }
  // submit a put request to the server
  updateContact(contact) {
    axios.put('/contacts', contact)
    .then(response => {
      console.log(response.data);
      count = 0;
      this.geo(this.geoCallback);
    });
  }
  // submit a delete request to the server
  deleteContact(contact) {
    axios.delete('/contacts', {data: contact})
    .then(response => {
      console.log(response.data);
      count = 0;
      this.geo(this.geoCallback);
    });
  }
  // handle clicking submit button
  handleButtonClick(e) {
    e.preventDefault();
    let data = {};
    data.id = this.state.items.length+1;
    data.name = document.getElementById('name').value;
    data.phone = document.getElementById('phone').value;
    data.email = document.getElementById('email').value;
    data.address = document.getElementById('address').value;
    this.setState({
      items: [...this.state.items, data]
    });
    this.submitNewContact(data);
    // count = 0;
  }
  // toggle contact's information
  showInfo(e, info) {
    e.preventDefault();
    var node = document.getElementById(info.name+'Info');
    if (node.style.display === 'none') {
      node.style.display = 'inline';
    } else {
      node.style.display = 'none';
    }
  }
  // handles clicking update button
  handleUpdateClick(e) {
    let contacts = this.state.items;
    let data = {};
    data.name = document.getElementById('name_update').value;
    data.phone = document.getElementById('phone_update').value;
    data.email = document.getElementById('email_update').value;
    data.address = document.getElementById('address_update').value;
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].name === data.name) {
        data.id = i+1;
        let items = this.state.items;
        items[i] = data;
        this.setState({items});
        mymap.removeLayer(markers);
        markers = new L.FeatureGroup();
        this.updateContact(data);
      }
    }
  }
  // handles clicking delete button
  handleDelete(e, data) {
    let items = this.state.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name === data.name) {
        items.splice(i, 1);
      }
    }
    // reset contact's id
    for (var i = 0; i < items.length; i++) {
      items[i].id = i+1;
    }
    this.setState({items});
    mymap.removeLayer(markers);
    markers = new L.FeatureGroup();
    this.deleteContact(data);
  }

  render () {
    return (<div id="container">
      <div id="mapid"></div>
      <List id="contact_list" items={this.state.items} showInfo={this.showInfo} handleDelete={this.handleDelete.bind(this)}/>
      <Form id="create" handleButtonClick={this.handleButtonClick.bind(this)}/>
      <Update id="update" handleUpdateClick={this.handleUpdateClick.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


