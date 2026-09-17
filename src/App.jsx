import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import MainLayout from "./components/MainLayout";

function App() {
  const [ready, setReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1000)), // minimum display time
    ]).then(() => {
      setReady(true);

      // Remove LoadingScreen from DOM completely after the fade transition finishes (1000ms)
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MainLayout ready={ready} />
      {showLoading && (
        <div
          className={`absolute inset-0 z-50 transition-opacity duration-500 ease-in-out ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}

export default App;
