import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/admin/AdminHome.tsx";
import CartMainGrid from "./pages/admin/components/carts/CartMainGrid.tsx";
import ItemMainGrid from "./pages/admin/components/items/ItemMainGrid.tsx";
import OrderMainGrid from "./pages/admin/components/orders/OrderMainGrid.tsx";
import OrderCreate from "./pages/admin/components/orders/form/OrderCreate.tsx";
import OrderDeposit from "./pages/admin/components/orders/form/OrderDeposit.tsx";
import ProductMainGrid from "./pages/admin/components/products/ProductMainGrid.tsx";
import ProductCreate from "./pages/admin/components/products/form/ProductCreate.tsx";
import StockCreate from "./pages/admin/components/products/form/StockCreate.tsx";
import StockMainGrid from "./pages/admin/components/products/stock/StockMainGrid.tsx";
import Settings from "./pages/admin/components/settings/Settings.tsx";
import General from "./pages/admin/components/settings/general/General.tsx";
import Notifications from "./pages/admin/components/settings/notifications/Notifications.tsx";
import Preference from "./pages/admin/components/settings/preference/Preference.tsx";
import UserPermission from "./pages/admin/components/settings/user-permission/UserPermission.tsx";
import UserMainGrid from "./pages/admin/components/users/UserMainGrid.tsx";
import UserCreate from "./pages/admin/components/users/form/UserCreate.tsx";
import AdminLayout from "./pages/admin/layout/AdminLayout.tsx";
import AppLogin from "./pages/authentication/AppLogin.tsx";
import AppLayout from "./pages/layout/authentication/Layout.tsx";
import AppPublicLayout from "./pages/layout/public/Layout.tsx";
import ViewItemPage from "./pages/products/ViewItemPage";
import ViewItemsPage from "./pages/products/ViewItemsPage.tsx";

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
<<<<<<< HEAD
        <Route index path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/carts" element={<CartMainGrid />} />
        <Route path="/admin/items" element={<ItemMainGrid />} />
        {/* route people */}
        <Route path="/admin/people" element={<UserMainGrid />} />
        <Route path="/admin/people/admin" element={<UserMainGrid />} />
        <Route path="/admin/people/user" element={<UserMainGrid />} />
        <Route path="/admin/people/client" element={<UserMainGrid />} />
        <Route path="/admin/people/create" element={<UserCreate />} />
        <Route path="/admin/people/update/:id" element={<UserCreate />} />
        {/* route product */}
        <Route path="/admin/products" element={<ProductMainGrid />} />
        <Route path="/admin/products/stock" element={<StockMainGrid />} />
        <Route path="/admin/products/create" element={<ProductCreate />} />
        <Route path="/admin/products/stock/create/" element={<StockCreate />} />
        <Route path="/admin/products/update/:id" element={<ProductCreate />} />
=======
        <Route index path="home" element={<AdminHome />} />
        <Route path="carts" element={<CartMainGrid />} />
        <Route path="items" element={<ItemMainGrid />} />

        {/* route people */}
        <Route path="people" element={<UserMainGrid />} />
        <Route path="people/create" element={<UserCreate />} />
        <Route path="people/update/:id" element={<UserCreate />} />
        {/* route product */}
        <Route path="products" element={<ProductMainGrid />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/update/:id" element={<ProductCreate />} />
>>>>>>> 0c774f0371b2bbd52299a47113be96c4dada030c
        {/* route settings */}
        <Route path="/admin/settings" element={<Settings />}>
          <Route index path="general" element={<General />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="preference" element={<Preference />} />
          <Route
            path="/admin/settings/user-permissions"
            element={<UserPermission />}
          />
        </Route>
        {/* route order */}
        <Route path="/admin/orders" element={<OrderMainGrid />} />
        <Route path="/admin/orders/create" element={<OrderCreate />} />
        <Route path="/admin/orders/deposit" element={<OrderDeposit />} />
      </Route>

      <Route path="/" element={<AppPublicLayout />}>
        <Route path="/login" element={<AppLogin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
