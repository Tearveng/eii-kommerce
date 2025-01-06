import { Route, Routes } from "react-router-dom";
import AppLayout from "./pages/layout/Layout.tsx";
import ViewItemPage from "./pages/products/ViewItemPage";
import ViewItemsPage from "./pages/products/ViewItemsPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Define your routes using Route */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ViewItemsPage />} />
        <Route path="/item" element={<ViewItemPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
