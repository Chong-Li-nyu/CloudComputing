import React from 'react';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import CheckItem from './CheckItem';
import { db } from '../FireBaseService'
import App from "../App";
import CheckList from "./CheckList";

export default class CheckListContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checkItems: []
    };
  }
  componentDidMount() {
    const productsRef = db.ref('products');
    productsRef.once('value').then( (snapshot) => {
      let items = [];
      snapshot.forEach( (childSnapshot) => {
        const productId = childSnapshot.key;
        const data = childSnapshot.val();
        items.push(
          {
            id: productId,
            name: data.name,
            price: data.price
          }
        );
      });
      this.setState({checkItems: items});
    });
  }

  render() {
    return (
      <CheckList checkItems={this.state.checkItems}>
      </CheckList>
    );
  }
};