import React from "react";

import { useForm } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { Form, Skeleton } from "antd";

import { Text } from "@/components";
import { Task } from "@/graphql/schema.types";
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

const TitleInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const onTitleChange = (newTitle: string) => {
    onChange?.(newTitle);
  };

  return (
    <Text
      editable={{
        onChange: onTitleChange,
      }}
      style={{ width: "98%" }}
    >
      {value}
    </Text>
  );
};

type Props = {
  initialValues: {
    title?: Task["title"];
  };
  isLoading?: boolean;
};

export const TitleForm = ({ initialValues, isLoading }: Props) => {
  /**
   * useInvalidate is used to invalidate the state of a particular resource or dataProvider
   * Means, it will refetch the data from the server and update the state of the resource or dataProvider. We can also specify which part of the state we want to invalidate.
   * We typically use this hook when we want to refetch the data from the server after a mutation is successful.
   *
   * https://refine.dev/docs/data/hooks/use-invalidate/
   */
  const invalidate = useInvalidate();

  // use the useForm hook to manage the form for adding a title to a task
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
    Pick<GetVariables<UpdateTaskMutationVariables>, "title">
  >({
    queryOptions: {
      // disable the query to prevent fetching data on component mount
      enabled: false,
    },
    redirect: false, // disable redirection
    warnWhenUnsavedChanges: false, // disable warning when there are unsaved changes
    /**
     * autoSave is used to automatically save the form when the value of the form changes. It accepts an object with 1 property:
     * enabled: boolean - whether to enable autoSave or not
     *
     * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#autosave
     *
     * In this case, we are enabling autoSave.
     */
    autoSave: {
      enabled: true,
    },
    // invalidate the list page of the tasks resource when the mutation is successful
    onMutationSuccess: () => {
      // refetch the list page of the tasks resource
      invalidate({ invalidates: ["list"], resource: "tasks" });
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  // set the title of the form to the title of the task
  React.useEffect(() => {
    formProps.form?.setFieldsValue(initialValues);
  }, [initialValues.title]);

  if (isLoading) {
    return (
      <Skeleton.Input
        size="small"
        style={{ width: "95%", height: "22px" }}
        block
      />
    );
  }

  return (
    <Form {...formProps} initialValues={initialValues}>
      <Form.Item noStyle name="title">
        <TitleInput />
      </Form.Item>
    </Form>
  );
};
