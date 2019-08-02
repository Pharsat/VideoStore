import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart, faHeartRegular);

function App() {
  return <Movies />;
}

export default App;
