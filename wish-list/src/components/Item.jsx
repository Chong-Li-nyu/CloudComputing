import React from 'react';
export default class Item extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      checked: false,
      contributeAmount: '',
      remAmount: props.price,
      completed: false,
    };
    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);    

  }

  validate(foo){
    let contribAmount = this.state.contributeAmount=='' ? 0 : parseInt(this.state.contributeAmount, 10)
    if(this.state.contributeAmount > this.state.remAmount){
      contribAmount = this.state.remAmount;
    }
    let newRemAmount = this.state.remAmount - contribAmount;
    this.setState({
      contributeAmount: '',
      remAmount: newRemAmount
    });
    if(contribAmount != 0 && newRemAmount == 0){
      console.log("should call deleteItem")
      foo(this.props.index);
    }
    console.log(this.props.info + ": update remain amount as "+ (this.state.remAmount - contribAmount));
  }

  handleClick (e){
    this.setState({
      checked: !this.state.checked
    });
  }
  handleChange(event) {
    this.setState({
      contributeAmount: parseInt(event.target.value),
    });
  }
  render (){
    // let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    let text = this.props.info
    let inputbox = <input type="text" ref={this.inputRef} name={this.props.info} value={this.state.contributeAmount} onChange={this.handleChange}/>
    return (
        <div className="row">
          <div className="col-md-12">
            &nbsp;{text}&nbsp;{this.state.remAmount}
            &nbsp;{this.state.remAmount == 0 ? null : inputbox}
          </div>
        </div>
    );
  }
}