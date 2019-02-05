import React from 'react';

const Update = (props) => (
  <div>
    <h3>Update Contact Information</h3>
    <form>
      Name:
      <input type="text" id="name_update"></input>
      <br></br>
      Phone:
      <input type="text" id="phone_update"></input>
      <br></br>
      Email:
      <input type="text" id="email_update"></input>
      <br></br>
      Address:
      <input type="text" id="address_update"></input>
    </form>
    <button type="submit" id="create_button" onClick={props.handleUpdateClick}>Update</button>
  </div>
)

export default Update;