import React from "react";
//importar componentes
import MyContent from "./components/MyContent";

import { Layout } from "antd";
import MyHeader from "./components/MyHeader";
import { BrowserRouter as Router } from "react-router-dom";




// Initialize Firebase

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <MyHeader />
          <MyContent />
          <Footer>Valentin Vivaldi - 2021</Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
