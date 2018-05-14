import React from 'react';
import { db } from '../FireBaseService'
import WishList from "./WishList";

export default class WishListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.items = {};
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {
    // pull out what we want in props
    const { match: { params } } = this.props;
    const id = params.id;
    const productsInListRef = db.ref('wishlists/' + id);
    this.initItems(productsInListRef);
    this.addItemsListener(productsInListRef);

  }

  initItems(productsInListRef) {
    productsInListRef.once('value', (snapshot) => {
      snapshot.forEach( (childSnapshot) => {
        const productId = childSnapshot.key;
        const data = childSnapshot.val();
        this.items[productId] = {id: productId, name: data.name, priceToGo: data.priceToGo};
      });
      this.setState({listItems: this.items});
    });
  }

  addItemsListener(productsInListRef) {
    productsInListRef.on('child_changed', (snapshot) => {
      if (snapshot.exists()) {
        const productId = snapshot.key;
        const data = snapshot.val();
        this.items[productId] = {id: productId, name: data.name, priceToGo: data.priceToGo};
        this.setState({listItems: this.items});
      }
    });
  }

  render() {
    return (
      <WishList items={this.state.listItems}>
      </WishList>
    );
  }
}