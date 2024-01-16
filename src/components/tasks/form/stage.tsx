import { useForm, useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";

import { AccordionHeaderSkeleton } from "@/components";
import {
  TaskStagesSelectQuery,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
import { TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";

type Props = {
  isLoading?: boolean;
};

export const StageForm = ({ isLoading }: Props) => {
  // use the useForm hook to manage the form for adding a stage to a task
  const { formProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    /**
     * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
     * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
     *
     * Pick<Type, Keys>
     * Type -> the type from which we want to pick the properties
     * Keys -> the properties that we want to pick
     */
    Pick<GetVariables<UpdateTaskMutationVariables>, "stageId" | "completed">
  >({
    queryOptions: {
      // disable the query to prevent fetching data on component mount
      enabled: false,
    },

    /**
     * autoSave is used to automatically save the form when the value of the form changes. It accepts an object with 2 properties:
     * enabled: boolean - whether to enable autoSave or not
     * debounce: number - the debounce time in milliseconds
     *
     * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#autosave
     *
     * In this case, we are enabling autoSave and setting the debounce time to 0. Means immediately save the form when the value changes.
     */
    autoSave: {
      enabled: true,
      debounce: 0,
    },
    // specify the mutation that should be performed
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  // use the useSelect hook to fetch the task stages and pass it to the select component. This will allow us to select a stage for the task.
  // https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/
  const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
    // specify the resource that we want to fetch
    resource: "taskStages",
    // specify a filter to only fetch the stages with the title "TODO", "IN PROGRESS", "IN REVIEW", "DONE"
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    // specify a sorter to sort the stages by createdAt in ascending order
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    // specify the gqlQuery that should be performed
    meta: {
      gqlQuery: TASK_STAGES_SELECT_QUERY,
    },
  });

  if (isLoading) return <AccordionHeaderSkeleton />;

  return (
    <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
      <Form
        layout="inline"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        {...formProps}
      >
        <Space size={5}>
          <FlagOutlined />
          <Form.Item
            noStyle
            name={["stageId"]}
            initialValue={formProps?.initialValues?.stage?.id}
          >
            <Select
              {...selectProps}
              // determines whether the width of the dropdown menu should match the width of the select box.
              popupMatchSelectWidth={false}
              // concat the options with an option for unassigned stage
              options={selectProps.options?.concat([
                {
                  label: "Unassigned",
                  value: null,
                },
              ])}
              bordered={false}
              showSearch={false}
              placeholder="Select a stage"
              onSearch={undefined}
              size="small"
            />
          </Form.Item>
        </Space>
        <Form.Item noStyle name="completed" valuePropName="checked">
          <Checkbox>Mark as complete</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};
