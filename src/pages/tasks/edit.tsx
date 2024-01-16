import { useState } from "react";

import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

import {
  Accordion,
  DescriptionForm,
  DescriptionHeader,
  DueDateForm,
  DueDateHeader,
  StageForm,
  TitleForm,
  UsersForm,
  UsersHeader,
} from "@/components";
import { Task } from "@/graphql/schema.types";

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

const TasksEditPage = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  // use the list method to navigate to the list page of the tasks resource from the navigation hook
  const { list } = useNavigation();

  // create a modal form to edit a task using the useModalForm hook
  // modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
  // close -> It's a function that closes the modal
  // queryResult -> It's an instance of useQuery from react-query
  const { modalProps, close, queryResult } = useModalForm<Task>({
    // specify the action to perform i.e., create or edit
    action: "edit",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  // get the data of the task from the queryResult
  const { description, dueDate, users, title } = queryResult?.data?.data ?? {};

  const isLoading = queryResult?.isLoading ?? true;

  return (
    <Modal
      {...modalProps}
      className="kanban-update-modal"
      onCancel={() => {
        close();
        list("tasks", "replace");
      }}
      title={<TitleForm initialValues={{ title }} isLoading={isLoading} />}
      width={586}
      footer={
        <DeleteButton
          type="link"
          onSuccess={() => {
            list("tasks", "replace");
          }}
        >
          Delete card
        </DeleteButton>
      }
    >
      {/* Render the stage form */}
      <StageForm isLoading={isLoading} />

      {/* Render the description form inside an accordion */}
      <Accordion
        accordionKey="description"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DescriptionHeader description={description} />}
        isLoading={isLoading}
        icon={<AlignLeftOutlined />}
        label="Description"
      >
        <DescriptionForm
          initialValues={{ description }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Render the due date form inside an accordion */}
      <Accordion
        accordionKey="due-date"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DueDateHeader dueData={dueDate} />}
        isLoading={isLoading}
        icon={<FieldTimeOutlined />}
        label="Due date"
      >
        <DueDateForm
          initialValues={{ dueDate: dueDate ?? undefined }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Render the users form inside an accordion */}
      <Accordion
        accordionKey="users"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<UsersHeader users={users} />}
        isLoading={isLoading}
        icon={<UsergroupAddOutlined />}
        label="Users"
      >
        <UsersForm
          initialValues={{
            userIds: users?.map((user) => ({
              label: user.name,
              value: user.id,
            })),
          }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
    </Modal>
  );
};

export default TasksEditPage;