import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/admin/AdminHome.tsx";
import OrderMainGrid from "./pages/admin/components/orders/OrderMainGrid.tsx";
import ProductCreate from "./pages/admin/components/products/form/ProductCreate.tsx";
import ProductMainGrid from "./pages/admin/components/products/ProductMainGrid.tsx";
import AdminLayout from "./pages/admin/layout/AdminLayout.tsx";
import AppLogin from "./pages/authentication/AppLogin.tsx";
import AppLayout from "./pages/layout/authentication/Layout.tsx";
import AppPublicLayout from "./pages/layout/public/Layout.tsx";
import ViewItemPage from "./pages/products/ViewItemPage";
import ViewItemsPage from "./pages/products/ViewItemsPage.tsx";
import CartMainGrid from "./pages/admin/components/carts/CartMainGrid.tsx";
import ItemMainGrid from "./pages/admin/components/items/ItemMainGrid.tsx";
import UserMainGrid from "./pages/admin/components/users/UserMainGrid.tsx";
import UserCreate from "./pages/admin/components/users/form/UserCreate.tsx";
import Settings from "./pages/admin/components/settings/Settings.tsx";
import General from "./pages/admin/components/settings/general/General.tsx";
import Notifications from "./pages/admin/components/settings/notifications/Notifications.tsx";
import Preference from "./pages/admin/components/settings/preference/Preference.tsx";
import OrderCreate from "./pages/admin/components/orders/form/OrderCreate.tsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* user pages */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ViewItemsPage />} />
        <Route path="/item/:skuCode/:id" element={<ViewItemPage />} />
      </Route>

      {/* admin pages */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/carts" element={<CartMainGrid />} />
        <Route path="/admin/items" element={<ItemMainGrid />} />

        {/* route people */}
        <Route path="/admin/people" element={<UserMainGrid />} />
        <Route path="/admin/people/create" element={<UserCreate />} />
        <Route path="/admin/people/update/:id" element={<UserCreate />} />
        {/* route product */}
        <Route path="/admin/products" element={<ProductMainGrid />} />
        <Route path="/admin/products/create" element={<ProductCreate />} />
        <Route path="/admin/products/update/:id" element={<ProductCreate />} />
        {/* route settings */}
        <Route path="/admin/settings" element={<Settings />}>
          <Route index path="/admin/settings/general" element={<General />} />
          <Route
            index
            path="/admin/settings/notifications"
            element={<Notifications />}
          />
          <Route
            index
            path="/admin/settings/preference"
            element={<Preference />}
          />
        </Route>
        {/* route order */}
        <Route path="/admin/orders" element={<OrderMainGrid />} />
        <Route path="/admin/orders/create" element={<OrderCreate />} />
      </Route>

      <Route path="/" element={<AppPublicLayout />}>
        <Route path="/login" element={<AppLogin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
