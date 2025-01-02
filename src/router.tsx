import { Route, Routes } from "react-router-dom";
import AppLayout from "./pages/layout/Layout.tsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes using Route */}
      <Route path="/" element={<AppLayout />} />
    </Routes>
  );
};

export default AppRouter;
