import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { USERS_SELECT_QUERY  } from '@/graphql/queries';
import { User } from '@/graphql/schema.types';
import { UsersListQuery} from '@/graphql/types';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { HttpError, getDefaultFilter, useGo } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Input, Space, Table } from 'antd';

export const UsersList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable<
    GetFieldsFromList<UsersListQuery>,
    HttpError,
    GetFieldsFromList<UsersListQuery>
  >({
    resource: 'users',
    onSearch: (values) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: values.name
        }
      ]
    },
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc'
        }
      ]
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined
        }
      ]
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY 
    }
  })

  return (
  <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton 
          onClick={() => {
            go({
              to: {
                resource: 'users',
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace'
            })
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column<User>
          dataIndex="name"
          title="User Name"
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search User" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
              <Text style={{ whiteSpace: 'nowrap' }}>
              {record.name}
              </Text>
            </Space>
          )}
        />
        <Table.Column<User>
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton hideText size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </List>
    {children}
    </div>
  )
}
