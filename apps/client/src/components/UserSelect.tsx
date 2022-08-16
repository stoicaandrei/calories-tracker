import { Select } from 'antd';
import { useUsers } from '../queries/admin.users.queries';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const UserSelect = ({ value, onChange }: Props) => {
  const { data, isLoading } = useUsers();

  return (
    <Select
      loading={isLoading}
      value={value}
      onChange={onChange}
      className="w-60"
      placeholder="Select a user"
    >
      {data?.map((user) => (
        <Select.Option key={user._id} value={user._id}>
          {user.email}
        </Select.Option>
      ))}
    </Select>
  );
};
