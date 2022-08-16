import { FoodEntry } from '@calories-tracker/api-interfaces';
import { useAuth } from '@hooks';
import { Collapse, Empty } from 'antd';
import moment from 'moment';
import { FoodEntriesList } from './FoodEntriesList';

type Props = {
  data?: FoodEntry[];
  updateItem?: (item: FoodEntry) => void;
  deleteItem?: (item: FoodEntry) => void;
  groupBy?: 'day' | 'month' | null;
  showExtra?: boolean;
};

type GroupMap = {
  [key: string]: {
    entries: FoodEntry[];
    totalCalories: number;
    totalSpent: number;
  };
};

export const FoodEntriesGroups = ({
  data,
  updateItem,
  deleteItem,
  groupBy,
  showExtra = true,
}: Props) => {
  const { caloriesGoal } = useAuth();
  const groupMap: GroupMap = {};

  if (!data || !data.length) return <Empty description="No food entries yet" />;

  if (!groupBy) {
    return (
      <FoodEntriesList
        data={data}
        updateItem={updateItem}
        deleteItem={deleteItem}
        fullDate
      />
    );
  }

  data
    ?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    .forEach((entry) => {
      let key = '';
      if (groupBy === 'day') key = moment(entry.timestamp).format('DD MMMM');
      if (groupBy === 'month')
        key = moment(entry.timestamp).format('MMMM YYYY');

      if (!groupMap[key]) {
        groupMap[key] = {
          entries: [],
          totalCalories: 0,
          totalSpent: 0,
        };
      }

      groupMap[key].entries.push(entry);
      groupMap[key].totalCalories += entry.calories;
      groupMap[key].totalSpent += entry.price;
    });

  const defaultActiveDays = data?.map((entry) =>
    moment(entry.timestamp).format('DD MMMM')
  );
  const defaultActiveMonths = data?.map((entry) =>
    moment(entry.timestamp).format('MMMM YYYY')
  );
  const defaultActiveKeys = [...defaultActiveDays, ...defaultActiveMonths];

  return (
    <Collapse defaultActiveKey={defaultActiveKeys}>
      {Object.entries(groupMap).map(([key, group]) => {
        let extra: string | undefined;
        if (groupBy === 'day')
          extra = `Calories: ${group.totalCalories} / ${caloriesGoal}`;
        if (groupBy === 'month') extra = `Spent: $${group.totalSpent} / 1,000`;
        if (!showExtra) extra = undefined;

        return (
          <Collapse.Panel header={key} key={key} extra={extra}>
            <FoodEntriesList
              data={group.entries}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};
