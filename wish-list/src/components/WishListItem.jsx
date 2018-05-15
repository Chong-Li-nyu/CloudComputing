import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { db } from '../FireBaseService'

export default class WishListItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      contributeAmount: 0,
      remAmount: this.props.priceToGo,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.priceToGo !== nextProps.priceToGo) {
      console.log('price to go: ', nextProps.priceToGo);
      this.setState({remainAmount: nextProps.priceToGo});
    }
  }

  validate(subRemainCount){
    let contribAmount = this.state.contributeAmount;
    let newRemAmount = this.state.remAmount;
    if (contribAmount !== 0) {
      if (this.state.contributeAmount > this.state.remAmount) {
        contribAmount = this.state.remAmount;
      }
      newRemAmount -= contribAmount;
      if (newRemAmount === 0) {
        console.log("should call subRemainCount");
        subRemainCount();
      }
      console.log(this.props.name + ": update remain amount to "+ newRemAmount);
      // reset state
      this.setState({
        contributeAmount: 0,
        remAmount: newRemAmount
      });
      // push changes to db
      db.ref('wishlists').child(`${this.props.wishListId}`).child(`${this.props.id}`).set(
        { priceToGo: newRemAmount }
      );
    }
    return contribAmount;
  }

  handleChange(event) {
    this.setState({
      contributeAmount: parseInt(event.target.value),
    });
  }
  render (){
    let name = this.props.name;
    let inputBox = <input type="text" name={name} value={this.state.contributeAmount} onChange={this.handleChange.bind(this)}/>;

    return (
        <div className="itemBox">
          <Row className="row align-items-start">
            <Col md={4}>{name}</Col>
            <Col md={3}>{this.state.remAmount < 0 ? null : `$ ${this.state.remAmount}`}</Col>
            <Col md={3}>{this.state.remAmount === 0 ? null : inputBox}</Col>
          </Row>
        </div>
    );
  }
}