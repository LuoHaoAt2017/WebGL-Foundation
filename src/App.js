import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Chapter1 from './pages/chapter1';
import Chapter2 from './pages/chapter2';
import Chapter3 from './pages/chapter3';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<About></About>}></Route>
        <Route path="/chapter1" element={<Chapter1></Chapter1>}></Route>
        <Route path="/chapter2" element={<Chapter2></Chapter2>}></Route>
        <Route path="/chapter3" element={<Chapter3></Chapter3>}></Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/chapter1">绘制多个点</Link>
        <Link to="/chapter2">绘制一个三角形</Link>
        <Link to="/chapter3">绘制一个矩形</Link>
      </nav>
    </>
  );
}
