import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h3>You have { props.items.length } contacts</h3>
    { props.items.map((item, index) => <ListItem key={item.name} item={item} index={index} showInfo={props.showInfo} handleDelete={props.handleDelete}/>)}
  </div>
)

export default List;