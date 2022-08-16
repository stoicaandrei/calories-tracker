import {
  useCreateFoodEntry,
  useDeleteFoodEntry,
  useFoodEntries,
  useUpdateFoodEntry,
} from '@queries';
import { Button, DatePicker, Select } from 'antd';
import { FoodEntriesGroups, FoodEntryModal } from '@components';
import { useModal } from '@hooks';
import moment, { Moment } from 'moment';
import { useState } from 'react';

export const UserDashboard = () => {
  const { data } = useFoodEntries();
  const { mutate: createFoodEntry } = useCreateFoodEntry();
  const { mutate: updateFoodEntry } = useUpdateFoodEntry();
  const { mutate: deleteFoodEntry } = useDeleteFoodEntry();

  const [selectedRange, setSelectedRange] = useState<
    [Moment | null, Moment | null] | null
  >();
  const [groupBy, setGroupBy] = useState<'day' | 'month' | null>('day');

  const [Modal, showModal] = useModal(FoodEntryModal);

  const filteredData = data?.filter((entry) => {
    if (!selectedRange) return true;
    const [start, end] = selectedRange;
    return moment(entry.timestamp).isBetween(
      start?.startOf('day'),
      end?.endOf('day')
    );
  });

  return (
    <div className="p-5 flex flex-row items-start justify-center">
      {Modal}
      <div className="w-2/3 flex flex-col gap-4">
        <Button
          type="primary"
          onClick={() =>
            showModal({
              onSubmit: createFoodEntry,
            })
          }
        >
          Add new entry
        </Button>
        <DatePicker.RangePicker
          value={selectedRange}
          onChange={(range) => setSelectedRange(range)}
        />
        <Select value={groupBy} onChange={setGroupBy}>
          <Select.Option>Group by None</Select.Option>
          <Select.Option value="day">Group by day</Select.Option>
          <Select.Option value="month">Group by month</Select.Option>
        </Select>
        <FoodEntriesGroups
          groupBy={groupBy}
          data={filteredData || []}
          deleteItem={(item) => deleteFoodEntry(item._id)}
          updateItem={(item) =>
            showModal({
              initialValues: item,
              onSubmit: (formData) =>
                updateFoodEntry({
                  ...item,
                  ...formData,
                }),
            })
          }
        />
      </div>
    </div>
  );
};
