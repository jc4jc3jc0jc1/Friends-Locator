import React from 'react';

const Form = (props) => (
  <div>
    <h3>Create New Contact</h3>
    <form>
      Name:
      <input type="text" id="name"></input>
      <br></br>
      Phone:
      <input type="text" id="phone"></input>
      <br></br>
      Email:
      <input type="text" id="email"></input>
      <br></br>
      Address:
      <input type="text" id="address"></input>
    </form>
    <button type="submit" id="create_button" onClick={props.handleButtonClick}>Submit</button>
  </div>
)

export default Form;