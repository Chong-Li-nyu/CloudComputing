import React, { Component } from 'react';
import ItemListContainer from './components/ItemListContainer.jsx';
import Item from './components/Item.jsx';
import {Button} from 'react-bootstrap';

var items = [ <Item info="item1" price="100" index="0"/>,
<Item info="item2" price="200" index="1"/>];

var infos = ["item1", "item2"];
var prices = [100, 200];

class App extends Component {
  render() {
    return (
      <div>
        <ItemListContainer items={items}/>
      </div>
    )
  }
}

export default App;
