import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import CheckListContainer from './CheckListContainer';
import WishList from './WishList';
import { paths } from '../FireBaseService';

class Home extends React.Component {
  constructor(props) {
    super(props);
    paths['home'] = window.location.href;
  }
  render() {
    return (
      <div className={"home"}>
        <button>{<Link to='/products'>Create a Wishlist!</Link>}</button>
      </div>
    );
  }
}

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={CheckListContainer}/>
      <Route path='/wishlists/:id' component={WishList}/>
    </Switch>
  </main>
);

export default Main