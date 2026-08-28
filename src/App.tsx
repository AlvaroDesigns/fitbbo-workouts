import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ExercisePage } from "./pages/ExercisePage";
import { HomePage } from "./pages/HomePage";
import { RoutinePage } from "./pages/RoutinePage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { WebViewProvider } from "./contexts/WebViewContext";

function App() {
  return (
    <WebViewProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routine/:routineKey" element={<RoutinePage />} />
          <Route path="/routine/:routineKey/workout/:dayKey" element={<WorkoutPage />} />
          <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
        </Routes>
      </Router>
    </WebViewProvider>
  );
}

export default App;
