import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList, UsersList } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import CreateUser from "./pages/users/create";
import EditUser from "./pages/users/edit";
import List from "./pages/tasks/list";
import EditTask from "./pages/tasks/edit";
import CreateTask from "./pages/tasks/create";
import CurrentUser from "./components/layout/current-user";
import {CurrentUserProvider} from './CurrentUserProvider'
function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
            <CurrentUserProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "WVyLEd-4karEq-tItoeC",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    element={
                    <Authenticated 
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                    }>
                      <Route index element={<Home />} />
                      <Route path="/companies" >
                        <Route index element={<CompanyList />} />
                        <Route path="new" element={<Create/>} />
                        <Route path="edit/:id" element={<Edit />} />
                      </Route>
                      <Route path="/users" >
                        <Route index element={<UsersList  />} />
                        <Route path="new" element={<CreateUser />} />
                        <Route path="edit/:id" element={<EditUser />} />
                      </Route>
                      <Route path="/tasks" element={
                        <List>
                          <Outlet />
                        </List>
                      }>
                        <Route path="new" element={<CreateTask />} />
                        <Route path="edit/:id" element={<EditTask />} />
                      </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              </CurrentUserProvider>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
