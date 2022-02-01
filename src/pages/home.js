import React from "react";
import { Link } from "react-router-dom";
import "@/styles/home.less";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main(){
    gl_FragColor = u_FragColor;
  }
`;

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
    // 获取 webgl 上下文
    const gl = getWebGLContext(canvas);
    if (!gl) {
      console.error("fail to get the rendering context for WebGL");
      return;
    }
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.error('fail to initialize shaders');
      return;
    }
    // 获取并设置 a_Position
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    // 获取并设置 a_PointSize
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    gl.vertexAttrib1f(a_PointSize, 10.0);
    // 获取并设置 u_FragColor
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
    // 设置背景色
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

export default Home;
