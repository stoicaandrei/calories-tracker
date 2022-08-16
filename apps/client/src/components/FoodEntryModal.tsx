import { FoodEntry } from '@calories-tracker/api-interfaces';
import { Modal } from 'antd';
import { FoodEntryForm } from './FoodEntryForm';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (foodEntry: FoodEntry) => void;
  initialValues?: Partial<FoodEntry>;
};

export const FoodEntryModal = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
}: Props) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <FoodEntryForm
        onSubmit={(entry) => {
          onSubmit?.(entry);
          onClose();
        }}
        initialValues={initialValues}
      />
    </Modal>
  );
};
