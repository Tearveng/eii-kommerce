import { Route, Routes } from "react-router-dom";
import AppLogin from "./pages/authentication/AppLogin.tsx";
import AppLayout from "./pages/layout/authentication/Layout.tsx";
import AppPublicLayout from "./pages/layout/public/Layout.tsx";
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
      <Route path="/" element={<AppPublicLayout />}>
        <Route path="/login" element={<AppLogin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
