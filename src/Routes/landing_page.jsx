import "./module.landingPage.css";
import Navbar from "../components/navbar";
import TopContainer from "../components/pageContainer";
import CenterPageContainer from "../components/centerPageContainer";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };
    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", preventZoom, { passive: false });
    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("keydown", preventZoom);
    };
  }, []);

  return (
    <div className="landingPageBackground">
      <Navbar />
      <TopContainer />
      <CenterPageContainer />
      <Footer />
    </div>
  );
}

export default HomePage;
