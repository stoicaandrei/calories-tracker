import { FC, ReactNode, useState } from 'react';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};
type OmitModalProps<T> = Omit<T, 'visible' | 'onClose'>;

export const useModal = <T extends ModalProps>(
  Modal: FC<T>,
  defaultProps?: OmitModalProps<T>
): [ReactNode, (data: OmitModalProps<T>) => void, boolean] => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [props, setProps] = useState<OmitModalProps<T>>(
    defaultProps || ({} as T)
  );

  const showModal = (data: OmitModalProps<T>) => {
    setProps(data);
    setVisibleModal(true);
  };

  const onClose = () => setVisibleModal(false);

  const RenderedModal = visibleModal && (
    <Modal {...(props as T)} visible={visibleModal} onClose={onClose} />
  );

  return [RenderedModal, showModal, visibleModal];
};
