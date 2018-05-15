import React from 'react';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import CheckItem from './CheckItem.jsx';
import { db } from '../FireBaseService'

export default class CheckList extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      chosenIds: [],
      wishListId: null
    };
    this.bufferChosenIds = [];
    this.bufferIdsIndex = 0;
    this.bufferIdToIndexMap = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checkItems !== nextProps.checkItems) {
      this.updateItems(nextProps.checkItems);
    }
  }

  addChosenIdToList(id) {
    // this.setState({chosenIds: this.state.chosenIds.push(id)});
    this.bufferChosenIds.push(id);
    this.bufferIdToIndexMap[id] = this.bufferIdsIndex;
    this.bufferIdsIndex++;
  }

  deleteChosenIdFromList(id) {
    const index = this.bufferIdToIndexMap[id];
    this.bufferChosenIds.splice(index, 1);
    this.bufferIdsIndex--;
  }

  updateItems(checkItems) {
    let itemsBuffer = [];
    for (let i = 0; i < checkItems.length; i++) {
      const item = checkItems[i];
      itemsBuffer.push(<CheckItem key={i} id={item["id"]} name={item["name"]} price={item["price"]} addChosenIdToList={this.addChosenIdToList.bind(this)} deleteChosenIdFromList={this.deleteChosenIdFromList.bind(this)}/>);
    }
    this.setState({items: itemsBuffer});
  }

  submitInput(event) {
    this.setState({chosenIds: this.bufferChosenIds}, () => {
      // write the data to database
      let wishlist = {};
      let len = 0;
      for (let productId of this.state.chosenIds) {
        db.ref('products/' + productId).once('value', (snapshot) => {
          const product = snapshot.val();
          wishlist[productId] = {
            name: product.name,
            priceToGo: product.price
          };
          len++;
          if (len === this.state.chosenIds.length) {
            // push to database
            const id = db.ref('wishlist').push().key;
            this.setState({wishListId: id});
            db.ref('wishlists/' + id).set(wishlist);
          }
        });
      }
    });
    event.preventDefault();
  }

  componentDidUpdate() {
    this.bufferChosenIds = [];
  }

  render() {
    if (this.state.wishListId) {
      return (<div><label>Share this wishlist id: <b>{this.state.wishListId}</b> to your friends!</label></div>);
    } else {
      return (
        <Jumbotron>
          <Grid>
            <form onSubmit={this.submitInput.bind(this)}>
              {this.state.items}
              <div className="buttonBox">
                <Button type="submit" bsStyle='success'>Submit</Button>
              </div>
            </form>
          </Grid>
        </Jumbotron>
      );
    }
  }
}