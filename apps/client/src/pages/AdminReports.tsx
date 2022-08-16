import { useAdminFoodEntries, useIndexedUsers, useUsers } from '@queries';
import { Button, Card, Statistic, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const AdminReports = () => {
  const { data: foodEntries } = useAdminFoodEntries();

  const { data: users } = useIndexedUsers();

  const entriesLast7Days = foodEntries?.filter((entry) => {
    const start = moment().subtract(7, 'days');
    return moment(entry.timestamp).isBetween(start, moment());
  });
  const entriesWeekBefore = foodEntries?.filter((entry) => {
    const start = moment().subtract(14, 'days');
    const end = moment().subtract(7, 'days');
    return moment(entry.timestamp).isBetween(start, end);
  });

  const addedLast7Days = entriesLast7Days?.length || 0;
  const addedWeekBefore = entriesWeekBefore?.length || 0;

  const usersCaloriesMap: {
    [key: string]: number;
  } = {};
  entriesLast7Days?.forEach((entry) => {
    if (!usersCaloriesMap[entry.userId]) {
      usersCaloriesMap[entry.userId] = 0;
    }
    usersCaloriesMap[entry.userId] += entry.calories;
  });
  const averageCaloriesLast7Days =
    Object.values(usersCaloriesMap).reduce((a, b) => a + b, 0) /
    Object.keys(usersCaloriesMap).length;

  const usersCalories = Object.entries(usersCaloriesMap).map(
    ([userId, calories]) => ({
      user: users?.[userId].email,
      calories,
    })
  );

  return (
    <div className="p-5 flex flex-row items-start justify-center">
      <div className="w-2/3 flex flex-col gap-4">
        <Button type="dashed">
          <Link to="/entries">Got to entries</Link>
        </Button>
        <div className="flex flex-row items-start gap-3">
          <Card>
            <Statistic
              title="Current date"
              value={moment().format('DD MMM YYYY')}
            />
          </Card>
          <Card>
            <Statistic
              title="Added last 7 days vs week before"
              value={`${addedLast7Days} / ${addedWeekBefore}`}
            />
          </Card>
          <Card>
            <Statistic
              title="Average calories last 7 days"
              value={averageCaloriesLast7Days}
            />
          </Card>
        </div>
        <Card className="grow">
          <span className="text-lg">Calories per user last 7 days</span>
          <Table
            className="mt-2"
            rowKey="user"
            dataSource={usersCalories}
            pagination={false}
            columns={[
              { title: 'User', dataIndex: 'user' },
              { title: 'Calories', dataIndex: 'calories' },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};
