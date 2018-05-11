import React from 'react';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';
import CheckItem from './CheckItem.jsx';

export default class CheckList extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      chosenIds: [],
      children: [],
      childrenClone: []
    };
    this.bufferChosenIds = [];
    this.submitInput = this.submitInput.bind(this);
    this.addChosenIdToList = this.addChosenIdToList.bind(this);
  }

  submitInput(event){
    this.state.childrenClone.forEach((el) => {
      const r = el.ref; //use the ref to access the child's methods
      this.refs[r].validate(this.addChosenIdToList);
      this.setState({chosenIds: this.bufferChosenIds})
    });
    event.preventDefault();
  }

  addChosenIdToList(id){
    // this.setState({chosenIds: this.state.chosenIds.push(id)});
    this.bufferChosenIds.push(id);
  }

  // when input changes
  componentDidUpdate(){
    this.bufferChosenIds = [];
    console.log(this.state.chosenIds);
    // this.state.children = React.Children.toArray(this.props.children);
    // for (const child of this.state.children) {
    //   this.state.childrenClone = React.cloneElement(child, {ref: Math.random().toString(36).slice(-5)});
    // }
  }

  render() {
    console.log('children?: ',this.props.children);
    this.state.children = React.Children.toArray(this.props.children);
    for (const child of this.state.children) {
      this.state.childrenClone = React.cloneElement(child, {ref: Math.random().toString(36).slice(-5)});
    }
    return (
    <Jumbotron>
      <Grid>
      <form onSubmit={this.submitInput}>
        {console.log('children clone?: ',this.childrenClone)}
        {this.state.childrenClone}
          <div className="buttonBox">
            <Button type="submit" bsStyle='success'>Submit</Button>
          </div>
      </form>
      </Grid>
    </Jumbotron>
    );
  }
}