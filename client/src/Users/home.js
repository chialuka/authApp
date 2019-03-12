import React from "react";

const HomePage = () => {
  if (!sessionStorage.token) {
    window.location.href = "/"
  }
  return(
    <div>Home is where the heart belongs...</div>
  )
};

export default HomePage;
