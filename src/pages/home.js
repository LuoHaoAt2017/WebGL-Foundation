import React from "react";
import { Link } from "react-router-dom";
import "@/styles/home.less";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  render() {
    return (
      <>
        <nav>
          <Link to="/about">About</Link>
        </nav>
        <main>
          <h2>Welcome to the homepage!</h2>
          <canvas ref={this.canvasRef}></canvas>
        </main>
      </>
    );
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const gl = getWebGLContext(canvas);
    if (!gl) {
      console.error("fail to get the rendering context for WebGL");
      return;
    }
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {

    }
  }
}

export default Home;
