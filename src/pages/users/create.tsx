import React from 'react'
import { UsersList } from './list'
import { Form, Input, Modal } from 'antd'
import { useModalForm } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'

const CreateUser = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: 'companies', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    })
  }

  const { formProps, modalProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION
    }
  })



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
            rules={[{required: true}]}
          >
            <Input placeholder="Please enter a user name" />
          </Form.Item>
        </Form>
      </Modal>
    </UsersList>
  )
}

export default CreateUser