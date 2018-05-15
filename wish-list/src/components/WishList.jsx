import React from 'react';
import { db } from '../FireBaseService'
import WishListItem from './WishListItem';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';

export default class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.itemRefs = [];
    this.listItemsBuffer = [];
    this.idToIndexMap = {};
    this.wishListId = null;
    this.state = {
      listItems: [],
      remainCount: -1,
      totalContribAmount: 0
    };
  }

  componentDidMount() {
    // pull out what we want in props
    const { match: { params } } = this.props;
    this.wishListId = params.id;
    console.log('wishlist id: ', this.wishListId);
    const productsInListRef = db.ref('wishlists/' + this.wishListId);
    this.initItems(productsInListRef);
    this.addItemsListener(productsInListRef);

  }

  initItems(productsInListRef) {
    productsInListRef.once('value', (snapshot) => {
      let index = 0;
      snapshot.forEach( (childSnapshot) => {
        let productId = childSnapshot.key;
        let data = childSnapshot.val();
        // add to indexing map
        this.idToIndexMap[productId] = index;
        // create new ref for item
        let itemRef = React.createRef();
        this.itemRefs.push(itemRef);
        // create element for item
        this.listItemsBuffer.push(<WishListItem key={productId} ref={itemRef} wishListId={this.wishListId} id={productId} name={data.name} priceToGo={data.priceToGo}/>);
        index++;
      });
      this.setState({remainCount: snapshot.length});
      this.setState({listItems: this.listItemsBuffer});
    });
  }

  addItemsListener(productsInListRef) {
    productsInListRef.on('child_changed', (snapshot) => {
      if (snapshot.exists()) {
        let productId = snapshot.key;
        let data = snapshot.val();
        let index = this.state.idToIndexMap[productId];
        this.listItemsBuffer[index].current.setRemAmount(data.priceToGo);
        // = <WishListItem key={productId} ref={this.itemRefs[index]} wishListId={this.wishListId} id={productId} name={data.name} priceToGo={data.priceToGo}/>;
        this.setState({listItems: this.listItemsBuffer});
      }
    });
  }

  subRemainCount() {
    this.setState({remainCount: this.state.remainCount - 1});
  }

  submitInput(event) {
    let newTotalContribAmount = 0;
    for (let i = 0; i < this.itemRefs.length; i++) {
      let itemRef = this.itemRefs[i];
      newTotalContribAmount += itemRef.current.validate(this.subRemainCount().bind(this));
    }
    this.setState({totalContribAmount: newTotalContribAmount});
    event.preventDefault();
  }

  render() {
    let remCountMsg;
    if (this.state.remainCount < 0) {
      remCountMsg = null;
    } else if (this.state.remainCount === 0) {
      remCountMsg = "Emmm, you guys bought all the gifts!";
    } else {
      remCountMsg = "There is " +  this.state.remainCount + " items on the list.";
    }
    let contribMsg = this.state.totalContribAmount === 0 ? null : <h4>Thanks, you have committed ${this.state.totalContribAmount} for gifts</h4>;

    return (
      <div className="topContainer">
        <div className = "titleBox">
          <h2>Wish List</h2>
        </div>
        <Jumbotron>
          <Grid>
            <div>
              <Row className="headerRow">
                <Col md={4}>Gift info</Col>
                <Col md={3}>Remaining</Col>
                <Col md={3}>Contribute</Col>
              </Row>
              <form className="form-horizontal"  onSubmit={this.submitInput.bind(this)}>
                {this.state.listItems}
                <div className="buttonBox">
                  <Button type="submit" bsStyle='success'>Buy</Button>
                </div>
              </form>
              <br/>
              <br/>
              {contribMsg}
            </div>

            <br />
            <br />
            <br />
            <h4>{remCountMsg}</h4>
            <hr />
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}