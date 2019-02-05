import React from 'react';

// const showInfo = (info) => {
//   console.log(info.name);
// }
var info_style = {
  display: 'none'
};


const ListItem = (props) => (
    <div>
      <span id='list_item' onClick={(e) => props.showInfo(e,props.item)}>{props.index+1}. {props.item.name}</span>
      <span id={props.item.name+'Info'} style={info_style}>{`'s contact information: Phone: ${props.item.phone} Email: ${props.item.email} Address: ${props.item.address}`}</span>
      <button id='create_button' onClick={(e) => props.handleDelete(e, props.item)}>Delete</button>
    </div>
)


export default ListItem;