import React from "react";

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
 * 绘制一个三角形
 */
class Chapter2 extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      gl: null,
    };
    this.initVertexBuffers = this.initVertexBuffers.bind(this);
  }

  render() {
    return (
      <>
        <main>
          <canvas ref={this.canvasRef}></canvas>
        </main>
      </>
    );
  }

  componentDidMount() {
    // 获取 canvas
    const canvas = this.canvasRef.current;
    // 获取 webgl
    const gl = getWebGLContext(canvas);
    this.setState({
      gl: gl,
    });
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.error("occur error when initShaders");
      return false;
    }
    // 指定绘图背景
    gl.clearColor(0.0, 1.0, 0.0, 1.0);
    // 清空绘图区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 设置顶点位置
    const n = this.initVertexBuffers(gl);
    // 获取 u_FragColor
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  initVertexBuffers(gl) {
    // 创建缓冲区对象
    const buffer = gl.createBuffer();
    // 绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 将数据写入缓冲区对象
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 将缓冲区对象分配给一个 attribute 变量
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 开启 attribute 变量
    gl.enableVertexAttribArray(a_Position);
    return 3;
  }
}

export default Chapter2;
