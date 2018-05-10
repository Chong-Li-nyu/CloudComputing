import React from 'react';
import Form from './Form.jsx';
import Item from './Item.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import { Button, Jumbotron } from 'react-bootstrap';
export default class ItemListContainer extends React.Component {
  constructor (props){
    super (props);
    this.state = {items : props.items, remainCount: props.items.length};
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(index){
    let newItems = this.state.items;
    //should delete the item with remaining amount is 0.
    this.setState({remainCount: this.state.remainCount - 1});
    this.setState({items: newItems});
  }

  render (){
    let msg = this.state.remainCount == 0? "Emmm, you guys bought all the gifts.": 
      "There is " +  this.state.remainCount + " items on your list.";
    return (
      // 
      
      <div className="topContainer">
        <div className = "titleBox">
        <h2>Wish List</h2>
        </div>
        <Jumbotron>

        <Grid>
        
        <Form deleteItem = {this.deleteItem}>
          {this.state.items}
        </Form>

        <br />
        <br />
        <br />
        <h4>{msg}</h4>
        <hr />
        </Grid>
      </Jumbotron>
      </div>
    );
  }
}


