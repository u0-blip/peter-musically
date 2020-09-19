import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/home';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import Navbar from './util/Navbar';


import Axios from 'axios';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Profile from './pages/profile';

Axios.defaults.baseURL = 'http://127.0.0.1:8000';

const client = new ApolloClient({
  uri: Axios.defaults.baseURL + '/graphql/',
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem('authToken') || ""
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authToken')
    }
  }
});

const IS_LOGGED_IN_QUERY = gql`
    query {
        isLoggedIn @client
    }
`;


export const GET_SELF_QUERY = gql`
  {
    userself {
      id
      username
      email
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($id:Int!){
    user (id: $id){
      id
      username
      email
      dateJoined
      musicSet{
        id
        title
        url
      }
    }
  }
`;

function App() {
  return (

    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/profile/:id' component={Profile} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}


export const GET_TRACKS_QUERY = gql`
  query getTracksQuery {
    music {
      id
      title
      description
      hashtag
      url
      owner {
        id
        username
      }
    }
  }

`;

export default App; 
