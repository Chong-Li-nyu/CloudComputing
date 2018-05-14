import React, { Component } from 'react';
import { db } from './FireBaseService'
import WishList from './components/WishList.jsx';
import WishListItem from './components/WishListItem.jsx';
import Header from './components/Header';
import {Button} from 'react-bootstrap';
import Main from './components/Main';

var items = [ <WishListItem info="item1" price="100" index="0"/>,
<WishListItem info="item2" price="200" index="1"/>];

var infos = ["item1", "item2"];
var prices = [100, 200];



class App extends Component {
  componentDidMount(){
    //  push sample products to database.
    const productsRef = db.ref('products');
    productsRef.once('value').then( (snapshot) => {
      if (snapshot.val().length <= 1) {
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
        <Header />
        <Main />
      </div>
    )
  }
}

export default App;
