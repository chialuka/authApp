import React from "react";

const HomePage = () => {
  if (!localStorage.token) {
    window.location.href = "/"
  }
  return(
    <div>Home is where the heart belongs...</div>
  )
};

export default HomePage;
