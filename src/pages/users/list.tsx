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
import { useGetIdentity } from '@refinedev/core';

const roleLabels: { [key: string]: string } = {
  ADMIN: "Admin",
  SALES_INTERN: "Sales Intern",
  SALES_MANAGER: "Sales Manager",
  SALES_PERSON: "Sales Person"
};


export const UsersList = ({ children }: React.PropsWithChildren) => {
  const { data: identityData } = useGetIdentity<User>();

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
            dataIndex="role" // Assuming the field name for user role is 'role'
            title="User Role"
            render={(value) => (
              <Text>{roleLabels[value]}</Text>  // Use the roleLabels object to map the role to its label
            )}
          />
         <Table.Column<User>
            dataIndex="jobTitle"  // Assuming the field name for job title is 'jobTitle'
            title="Job Title"     // Set the title of the column
            render={(value) => (
              <Text>{value}</Text> // Render the job title value
            )}
          />
          <Table.Column<User>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value, record) => (
              <Space>
              {!((roleLabels[record.role] === 'Admin') || (identityData?.id === record.id)) ? (
                <>
                  <EditButton hideText size="small" recordItemId={value} />
                  <DeleteButton hideText size="small" recordItemId={value} />
                </>
              ) : null}
              </Space>
          )}
        />
        </Table>
      </List>
      {children}
    </div>
  )
}