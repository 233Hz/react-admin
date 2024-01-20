import { MessageInstance } from 'antd/es/message/interface';
import { NotificationInstance } from 'antd/es/notification/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';

type ModalInstance = Omit<ModalStaticFunctions, 'warn'>;

class AntdUtils {
  message: MessageInstance | null = null;
  notification: NotificationInstance | null = null;
  modal: ModalInstance | null = null;

  setMessage = (message: MessageInstance) => {
    this.message = message;
  };
  setNotification = (notification: NotificationInstance) => {
    this.notification = notification;
  };
  setModal = (modal: ModalInstance) => {
    this.modal = modal;
  };
}

export const antdUtils = new AntdUtils();
