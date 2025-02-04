
import React from "react";
import './../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./Calendar";
import Header from "./Header"; // Assuming you already have a Header component

const App = () => {
return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MyCalendar />} />
      </Routes>
    </Router>
  );
}

export default App
