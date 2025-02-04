import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import BusinessIntro from "./pages/BusinessIntro";
import Construction from "./pages/Construction";
import RequestForm from "./pages/RequestForm";
import NewsList from "./pages/NewsList";
import NewsView from "./pages/NewsView";
import NewsAdd from "./pages/NewsAdd";
import Hoisting from "./pages/Hoisting";
import CompanyMessage from "./pages/CompanyMessage";
import CompanyLocation from "./pages/CompanyLocation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/business" element={<BusinessIntro />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/newslist" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsView />} />
          <Route path="/newsadd" element={<NewsAdd />} />
          <Route path="/hoisting" element={<Hoisting />} />
          <Route path="/company" element={<CompanyMessage />} />
          <Route path="/location" element={<CompanyLocation />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
