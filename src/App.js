import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      listItems : [],
      fetched: false,
      offset: 10
    }
  }

  componentDidMount(){

    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => res.json())
    .then(result => {
      console.log(result);
      this.setState({
        listItems : result,
        fetched: true
      })
    })
  }

  loadMore = () => {
    this.setState({
      offset: this.state.offset + 10
    });
  }

  render() {

    let {listItems, fetched} = this.state;
    if(!fetched){
      return (<div className="loading">
        <p>Data is loading...</p>
      </div>);
    }
      
    return (
      <div className="container">
        <div className="List__view_screen">
          <p className="text-center">Showing {this.state.offset} of {this.state.listItems.length} results, click load more to display more results</p>
          <div className="bg-white">
            <ul className="List__view_container">
              {listItems.slice(0, this.state.offset).map(item => (
                <li key={item.id}>
                  <img src={item.thumbnailUrl} alt="img" />
                  <a href={item.url} target="_blank">{item.title}</a>
                </li>
                ))}
            </ul>
          </div>
          
        <button className="btn btn-primary btn-block" onClick={this.loadMore}>Load more</button>
        </div>
       
      </div>
    )
  }
}

export default App
