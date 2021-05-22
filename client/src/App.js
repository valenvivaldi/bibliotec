import React from "react";
//importar componentes
import MyContent from "./components/MyContent";

import { Layout } from "antd";
import MyHeader from "./components/MyHeader";
import { Router } from "react-router";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
 
      <div className="App">
        <Layout>
          <MyHeader />
          <MyContent />
          <Footer>Valentin Vivaldi - 2021</Footer>
        </Layout>
      </div>
    
  );
}

export default App;
