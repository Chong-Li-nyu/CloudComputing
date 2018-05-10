import React, { Component } from 'react';
import { db } from 'FireBaseService'
import ItemListContainer from './components/ItemListContainer.jsx';
import Item from './components/Item.jsx';
import {Button} from 'react-bootstrap';

var items = [ <Item info="item1" price="100" index="0"/>,
<Item info="item2" price="200" index="1"/>];

var infos = ["item1", "item2"];
var prices = [100, 200];



class App extends Component {
  componentDidMount(){
    //  push sample products to database.
    const productsRef = db.once('value', (products) => {
      if (products.length <= 1) {
        App.loadSampleProducts();
      }
    });
  }

  static loadSampleProducts() {
    const sampleProducts = App.generateSampleProducts();
    for (const product of sampleProducts) {
      db.ref('products').push(product);
    }
  }

  static generateSampleProducts() {
    let sampleProducts = [];
    sampleProducts.push({'name': 'iPhone 8', 'price': 699.00});
    sampleProducts.push({'name': 'iPhone X', 'price': 999.00});
    sampleProducts.push({'name': 'Amazon Echo', 'price': 95.99});
    sampleProducts.push({'name': 'Fire TV', 'price': 49.99});
    sampleProducts.push({'name': 'Kindle', 'price': 59.99});
    sampleProducts.push({'name': 'MacBook Pro, 15\"', 'price': 2799.00});
    sampleProducts.push({'name': 'MacBook Pro, 13\"', 'price': 1799.00});
    sampleProducts.push({'name': 'Sony MDR-XB650BT Headphones', 'price': 48.99});
    sampleProducts.push({'name': 'Sony XB950N1 Noise Canceling Headphones', 'price': 148.99});
    sampleProducts.push({'name': 'Hanke Travel Backpack', 'price': 29.99});
    sampleProducts.push({'name': 'Kopack Anti Theft Backpack', 'price': 39.99});
    sampleProducts.push({'name': 'iPad 9.7\"', 'price': 329.00});
    sampleProducts.push({'name': 'iPad 12.9\"', 'price': 799.00});

    return sampleProducts;
  }

  render() {
    return (
      <div>
        <ItemListContainer items={items}/>
      </div>
    )
  }
}

export default App;
