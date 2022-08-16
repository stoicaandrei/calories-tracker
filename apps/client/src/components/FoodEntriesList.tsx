import { FoodEntry } from '@calories-tracker/api-interfaces';
import { Button, List } from 'antd';
import moment from 'moment';
import { useIndexedUsers } from '../queries/admin.users.queries';

type Props = {
  data?: FoodEntry[];
  updateItem?: (item: FoodEntry) => void;
  deleteItem?: (item: FoodEntry) => void;
  fullDate?: boolean;
  displayUser?: boolean;
};

export const FoodEntriesList = ({
  data,
  updateItem,
  deleteItem,
  fullDate,
  displayUser,
}: Props) => {
  const { data: users } = useIndexedUsers();

  const dateFormatter = (date: Date) => {
    if (fullDate) {
      const [day, hour] = moment(date).format('DD MMMM$HH:mm').split('$');
      return (
        <div>
          {day}
          <br />
          {hour}
        </div>
      );
    }
    return moment(date).format('HH:mm');
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button key="update" type="link" onClick={() => updateItem?.(item)}>
              Edit
            </Button>,
            <Button
              key="delete"
              danger
              type="link"
              onClick={() => deleteItem?.(item)}
            >
              Remove
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={dateFormatter(item.timestamp)}
            title={item.name}
            description={`Calories: ${item.calories},  Price: $${item.price}`}
          />
          <span>{users?.[item.userId].email}</span>
        </List.Item>
      )}
    />
  );
};
