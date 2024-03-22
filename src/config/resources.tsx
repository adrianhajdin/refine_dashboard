import { DashboardOutlined, ProjectOutlined, ShopOutlined,UserOutlined} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardOutlined />
    }
  },
  {
    name: 'companies',
    list: '/companies',
    show: '/companies/:id',
    create: '/companies/new',
    edit: '/companies/edit/:id',
    meta: {
      label: 'Companies',
      icon: <ShopOutlined />
    }
  },
  {
    name: 'users',
    list: '/users',
    show: '/users/:id',
    create: '/users/new',
    edit: '/users/edit/:id',
    meta: {
      label: 'Users',
      icon: <UserOutlined />
    }
  },
  {
    name: 'tasks',
    list: '/tasks',
    create: '/tasks/new',
    edit: '/tasks/edit/:id',
    meta: {
      label: 'Tasks',
      icon: <ProjectOutlined />
    }
  }
]