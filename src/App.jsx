import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

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
        {/* 모든 페이지에서 Navbar 표시 */}
        <Navbar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 추가적인 페이지를 여기에서 설정할 수 있습니다. */}
        </Routes>

        {/* 모든 페이지에서 Footer 표시 */}
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
