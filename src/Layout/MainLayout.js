import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children}) {
  return (
    <div className="fullHeight">
      <Header/>
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
