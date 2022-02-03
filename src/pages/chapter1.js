import React from "react";
import { Link } from "react-router-dom";
import "@/styles/chapter1.less";

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

/**
 * 点击鼠标根据象限绘制不同颜色的点
 */
class Chapter1 extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      points: [],
      gl: null,
    };
    this.onClick = this.onClick.bind(this);
    this.transform = this.transform.bind(this);
    this.refresh = this.refresh.bind(this);
    this.setPointColor = this.setPointColor.bind(this);
  }

  render() {
    return (
      <>
        <nav>
          <Link to="/about">About</Link>
        </nav>
        <main>
          <h2>Welcome to the homepage!</h2>
          <canvas ref={this.canvasRef} onClick={this.onClick}></canvas>
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
    this.setState({
      gl: gl,
    });
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.error("fail to initialize shaders");
      return;
    }
    // 获取并设置 a_PointSize
    const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    gl.vertexAttrib1f(a_PointSize, 8.0);
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  onClick(evt) {
    const { x, y } = this.transform(evt);
    console.log("x: ", x, " y: ", y);
    const points = this.state.points;
    points.push({
      x: x,
      y: y,
    });
    this.setState({
      points: points,
    });
    this.refresh();
  }

  transform(evt) {
    const rect = evt.target.getBoundingClientRect();
    const x = (evt.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (rect.height / 2 - (evt.clientY - rect.top)) / (rect.height / 2);
    return {
      x,
      y,
    };
  }

  refresh() {
    const gl = this.state.gl;
    const points = this.state.points;
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 获取 a_Position
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    // 获取 u_FragColor
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    // 设置 a_Position，u_FragColor
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      gl.vertexAttrib3f(a_Position, point.x, point.y, 0.0);
      this.setPointColor(u_FragColor, point.x, point.y);
      // 绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }

  setPointColor(u_FragColor, x, y) {
    const gl = this.state.gl;
    if (x > 0 && y > 0) {
      gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    } else if (x < 0 && y > 0) {
      gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
    } else if (x < 0 && y < 0) {
      gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0);
    } else if (x > 0 && y < 0) {
      gl.uniform4f(u_FragColor, 1.0, 1.0, 0.0, 1.0);
    } else {
      gl.uniform4f(u_FragColor, 0.0, 0.0, 0.0, 1.0);
    }
  }
}

export default Chapter1;
