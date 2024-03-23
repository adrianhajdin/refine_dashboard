import { Col, Form, Input, Row } from 'antd';
import { Edit, useForm } from '@refinedev/antd';
import { UPDATE_USERS_MUTATION } from '@/graphql/mutations';
import CustomAvatar from '@/components/custom-avatar';
import { getNameInitials } from '@/utilities';
import { useCurrentUser } from '../../CurrentUserProvider'; // Update the path to CurrentUserProvider
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";
import { UpdateAdminMutation, UpdateAdminMutationVariables } from "@/graphql/types";



const EditPage = ()=> {
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  const { saveButtonProps, formProps, formLoading, queryResult } = useForm<
    GetFields<UpdateAdminMutation>,
    HttpError,
    GetVariables<UpdateAdminMutationVariables>
  >({
    mutationMode: "optimistic",
    resource: "users",
    action: "edit",
    id: userId, 
    errorNotification: () => {
      return {
        message: 'Error',
        description: `This email address is already used by another user.`,
        type: 'error'
      };
    },
    meta: {
      gqlMutation: UPDATE_USERS_MUTATION,
    },
  });

  const { avatarUrl, name, email, jobTitle, phone } = queryResult?.data?.data || {}
  

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{
                  width: 96,
                  height: 96,
                  marginBottom: "24px",
                }}
              />
              <Form.Item label="Name" name="name" initialValue={name}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue={email}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Job title" name="jobTitle" initialValue={jobTitle}>
                <Input placeholder="Job Title" />
              </Form.Item>
              <Form.Item label="Phone" name="phone" initialValue={phone}>
                <Input placeholder="Phone" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
