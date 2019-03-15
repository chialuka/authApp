import React from "react";

const LandingPage = () => {
  const token = window.location.search
  if (token) {
    const tok = token.slice(8);
    localStorage.setItem("token", JSON.stringify(tok))
    window.location.href = "/home"
  }
  return (
    <div>
      Please log in to view your page or sign up if you don't have an account.
    </div>
  );
};

export default LandingPage;
