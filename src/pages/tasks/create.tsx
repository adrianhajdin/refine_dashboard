import { useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

import { CREATE_TASK_MUTATION } from "@/graphql/mutations";

const TasksCreatePage = () => {
  // get search params from the url
  const [searchParams] = useSearchParams();

  /**
   * useNavigation is a hook by Refine that allows you to navigate to a page.
   * https://refine.dev/docs/routing/hooks/use-navigation/
   *
   * list method navigates to the list page of the specified resource.
   * https://refine.dev/docs/routing/hooks/use-navigation/#list
   */ const { list } = useNavigation();

  /**
   * useModalForm is a hook by Refine that allows you manage a form inside a modal.
   * it extends the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/
   *
   * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
   * Under the hood, it uses the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#formprops
   *
   * modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#modalprops
   */
  const { formProps, modalProps, close } = useModalForm({
    // specify the action to perform i.e., create or edit
    action: "create",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        // close the modal
        close();

        // navigate to the list page of the tasks resource
        list("tasks", "replace");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          // on finish, call the onFinish method of useModalForm to perform the mutation
          formProps?.onFinish?.({
            ...values,
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId"))
              : null,
            userIds: [],
          });
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TasksCreatePage;