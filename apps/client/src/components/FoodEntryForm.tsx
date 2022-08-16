import { FoodEntry } from '@calories-tracker/api-interfaces';
import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import moment from 'moment';
import { useAuth } from '../hooks/useAuth';
import { UserSelect } from './UserSelect';

type Props = {
  initialValues?: Partial<FoodEntry>;
  onSubmit?: (foodEntry: FoodEntry) => void;
};

export const FoodEntryForm = ({ onSubmit, initialValues }: Props) => {
  const { isAdmin } = useAuth();

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      initialValues={{
        ...initialValues,
        timestamp: initialValues?.timestamp
          ? moment(initialValues?.timestamp)
          : moment().startOf('day'),
      }}
    >
      {isAdmin && (
        <Form.Item
          label="User"
          name="userId"
          rules={[{ required: true, message: 'Please select a user' }]}
        >
          <UserSelect />
        </Form.Item>
      )}
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Food name" />
      </Form.Item>
      <Form.Item name="timestamp" label="Date" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="calories" label="Calories" rules={[{ required: true }]}>
        <InputNumber placeholder="50" min={0} />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber placeholder="1" min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
