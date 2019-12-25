import React, { Component } from "react";
import "./App.css";
import * as request from "superagent";
import { url } from "./constants";

export default class App extends Component {
  // declared the state to storethe fetched photos from unsplash API.
  state = {
    photos: []
  };
  componentDidMount() {
    // Using GET method getting the photos from unsplash API.
    request.get(url).then(item => {
      this.setState({
        photos: item.body
      });
      console.log("results fromstate", this.state.photos[0].urls);
    });
  }
  render() {
    return (
      <div>
        <h1>My Gallery</h1>
        {/* If there is no photos available display loading otherwise display photos  */}
        {!this.state.photos && "Loading..."}
        {this.state.photos && (
          <ul>
            {this.state.photos.map(photo => (
              <img key={photo.id} src={photo.urls.regular} alt="Dog" />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
