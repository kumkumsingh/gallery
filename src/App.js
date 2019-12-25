import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";
import { Button } from '@material-ui/core'

export default class App extends Component {
  // declared the state to storethe fetched photos from unsplash API.
  state = {
    photos: []
  };
  componentDidMount() {
    // Using GET method getting the photos from unsplash API.
    request.get(url).then(image => {
      this.setState({
        photos: image.body
      });
      console.log("results fromstate", this.state.photos);
    });
  }
  //onLoadMore arrow function to load more photos 
  onLoadMore = () => {
    //requesting unsplash API 
    request.get(url).then(image => {
    //setstate by doing spread operator
      this.setState({
        photos:[...this.state.photos,...image.body]
      })

      console.log("load more photos",this.state.photos)

    })
  }
  render() {
    return (
      <div className="App">
        <h1>My Gallery</h1>
        {/* If there is no photos available display loading otherwise display photos  */}
        {!this.state.photos && "Loading..."}
        {this.state.photos && (
          <ul className="grid-image-container">
            {this.state.photos.map(photo => (
              <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className="grid-image-item"/>
            ))}
          </ul>
        )}
        {/* button to load more photos on click event */}
        <div>
        <Button variant="contained" color="primary" onClick={this.onLoadMore}>Load More</Button>
        </div>
      </div>
    );
  }
}
