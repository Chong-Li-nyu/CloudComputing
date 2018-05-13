import React from 'react';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';
import CheckItem from './CheckItem.jsx';

export default class CheckList extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      chosenIds: []
    };
    this.bufferChosenIds = [];
  }

  addChosenIdToList(id) {
    // this.setState({chosenIds: this.state.chosenIds.push(id)});
    this.bufferChosenIds.push(id);
    console.log('added: ', id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props!!!');
    if (this.props.checkItems !== nextProps.checkItems) {
      console.log('xian zai you le ba? ', nextProps.checkItems);
      this.updateItems(nextProps.checkItems);
    }
  }

  updateItems(checkItems) {
    let itemsBuffer = [];
    for (let i = 0; i < checkItems.length; i++) {
      const item = checkItems[i];
      itemsBuffer.push(<CheckItem key={i} id={item["id"]} name={item["name"]} price={item["price"]} addChosenIdToList={this.addChosenIdToList.bind(this)}/>);
    }
    this.setState({items: itemsBuffer});
  }

  submitInput(event) {
    this.setState({chosenIds: this.bufferChosenIds}, () => {
      console.log('chosen ids: ', this.state.chosenIds);
    });
    event.preventDefault();
  }

  componentDidUpdate() {
    this.bufferChosenIds = [];
  }

  render() {
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