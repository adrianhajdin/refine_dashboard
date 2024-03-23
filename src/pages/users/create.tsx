import { UsersList } from './list';
import { Form, Input, Select, Modal } from 'antd'; // Assuming Select is used for role
import { useModalForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_USERS_MUTATION } from '@/graphql/mutations';

const { Option } = Select;

const CreateUser = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: 'users', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    })
  }
  
  const { formProps, modalProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'users',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_USERS_MUTATION,
    }
  });



  return (
    <UsersList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="Create User"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="User name"
            name="name"
            rules={[{ required: true, message: 'Please enter a user name' }]}
          >
            <Input placeholder="Please enter a user name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter an email' }]}
          >
            <Input placeholder="Please enter an email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter a phone number' }]}
          >
            <Input placeholder="Please enter a phone number" />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: 'Please enter a job title' }]}
          >
            <Input placeholder="Please enter a job title" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Please select a role">
              <Option value="ADMIN">Admin</Option>
              <Option value="SALES_INTERN">Sales Intern</Option>
              <Option value="SALES_MANAGER">Sales Manager</Option>
              <Option value="SALES_PERSON">Sales Person</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </UsersList>
  );
}

export default CreateUser;
