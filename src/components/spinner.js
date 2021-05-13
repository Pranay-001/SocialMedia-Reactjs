import React, { Component } from 'react';
class spinner extends Component {
  render() {
    return (
      <div style={mmd} className="c-12">
        <div style={spin}>
          <h1>Loading...</h1>
        </div>
        <div
          className="spinner-border text-success c-12"
          style={spin}
          role="status"
        >
          <div
            className="spinner-border text-info c-12"
            style={spin}
            role="status"
          >
            <div
              className="spinner-border text-danger c-12"
              style={spin}
              role="status"
            >
              <div
                className="spinner-border text-warning c-12"
                style={spin}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mmd = {
  position: 'absoulte',
  height: '100vh',
  top: '4rem',
  background: 'black',
  opacity: '0.8',
  bottom: '0px',
  color: 'white',
  left: '0px',
  right: '0px',
  overflow: 'hidden',
};
const spin = {
  width: '5rem',
  height: '5rem',
  position: 'absolute',
  top: '45%',
  right: '45%',
  left: '40%',
  margin: 'auto',
  bottom: '45%',
};
export default spinner;
