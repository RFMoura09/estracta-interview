import {
  createBrowserRouter, Navigate,
} from "react-router-dom"
import LoginPage from "../login/login/LoginPage";
import DashboardPage from "../dashboard/dashboard/DashboardPage";
import ListCompaniesPage from "../dashboard/company/list-companies/ListCompaniesPage";
import { dashboardLoader, indexLoader, loginLoader } from "./Loaders";
import AddCompanyPage from "../dashboard/company/add-company/AddCompanyPage";
import EditCompanyPage from "../dashboard/company/edit-company/EditCompanyPage";
import DeleteCompanyPage from "../dashboard/company/delete-company/DeleteCompanyPage";


export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    loader: indexLoader,
  },
  {
    path: "/login",
    loader: loginLoader,
    children: [
      {
        index: true,
        element: <LoginPage />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    loader: dashboardLoader,
    children: [
      {
        path: '*',
        element: <Navigate to="company/list" />
      },
      {
        path: 'company/list',
        element: <ListCompaniesPage />
      },
      {
        path: 'company/add',
        element: <AddCompanyPage />
      },
      {
        path: 'company/edit',
        element: <EditCompanyPage />
      },
      {
        path: 'company/delete',
        element: <DeleteCompanyPage />
      },
    ]
  },
]);