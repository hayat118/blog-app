import Header from "./header";
import Home from "./home";
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";
// import Hero from "./hero";
import Single from "./singleArticle";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/:id" element={<Single />} />
      </Routes>
    </>
  );
}
export default App;
