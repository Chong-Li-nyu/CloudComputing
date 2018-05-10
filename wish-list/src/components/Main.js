import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ItemListContainer from './ItemListContainer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/items' component={ItemListContainer}/>
      <Route path='/wishlists/:id' component={WishList}/>
    </Switch>
  </main>
);