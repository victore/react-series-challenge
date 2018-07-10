import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import '../App.css';
import {} from '../.env';

//const URL = `http://api.giphy.com/v1/gifs/trending?api_key=`+process.env.REACT_APP_GIPHY_API_KEY+`&limit=10`;
const URL = `http://api.giphy.com/v1/gifs/trending?api_key=Y354pcUIVTGZXofCIqvlYWA2Bv1khCCZ&limit=10`;
//console.log(URL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      searchFor: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(URL)
      .then(res => {
        const gifs = res.data.data;
        this.setState({ gifs });
        //console.log(this.state.gifs);
      })
  }

  handleChange(event) {
    this.setState({searchFor: event.target.value});
    //console.log(event);
  }

  handleSubmit(event) {
    let url = 'http://api.giphy.com/v1/gifs/search?q='+this.state.searchFor+'&api_key='+process.env.REACT_APP_GIPHY_API_KEY+'&limit=10';
    axios.get(url)
      .then(res => {
        let gifs = res.data.data;
        this.setState({ gifs });
        //console.log(gifs);
      })

    event.preventDefault();
  }
  render() {
    return (
        <div className="homeComponent">
          <div className="search">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.searchFor} onChange={this.handleChange} className="search-input" />
              <input type="submit" value="Buscar" />
            </form>
          </div>
          <p className="App-intro">
            Trending:
          </p>
          <div className="container">
            { this.state.gifs.map(
              gif => <div className="element" key={gif.id}>
                      <img src={gif.images.downsized_medium.url} className="thegif" alt={gif.title}/>
                      <button onClick={() => this.addFavorite(gif)}>Like</button>
                    </div>
            )}
          </div>
        </div>
    );
  }

  addFavorite(gif) {
    let fav = {
      id: gif.id,
      title: gif.title,
      url: gif.images.downsized_medium.url
    }
    store.dispatch({
      type: "ADD_FAVORITE",
      favorite: fav
    })
    //console.log(fav);
  }
  
}

export default App;
