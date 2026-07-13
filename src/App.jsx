import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./hooks/useTheme";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden bg-neutral-50 font-mono text-neutral-800 antialiased transition-colors selection:bg-accent/30 dark:bg-neutral-950 dark:text-neutral-300">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
