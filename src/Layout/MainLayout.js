import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children, currentUser }) {
  return (
    <div className="fullHeight">
      <Header currentUser={currentUser} />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
