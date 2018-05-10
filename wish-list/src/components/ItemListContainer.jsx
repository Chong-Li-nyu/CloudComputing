import React from 'react';
import Form from './Form.jsx';
import Item from './Item.jsx';

var items = [          <Item info="item1" price="100"/>,
<Item info="item2" price="200"/>];

export default class ItemListContainer extends React.Component {
  constructor (props){
    super (props);
  }
  render (){
    return (
      <div>
        <AppJumbotron title="Wish List" />
        <Form>
          {items}
        </Form>
        <br />
        <br />
        <br />
        <ItemCount count={items.length} />
        <hr />
      </div>
    );
  }
}

class ItemCount extends React.Component {
    constructor (props){
        super(props);
        this.state = {
          remainCount: props.count,
        }
    }

    render (){
        return (
            <h4>There are {this.state.remainCount} items on your list</h4>
        );
    }
}

class AppJumbotron extends React.Component {
  render (){
    return (
      <div className="jumbotron">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}