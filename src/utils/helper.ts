import Toast, {ToastPosition, ToastType} from 'react-native-toast-message';

export const showToast = ({
    type,
    message,
    position,
  }: {
    type?: ToastType;
    message: string;
    position?: ToastPosition;
  }) => {
    try {
      Toast.show({
        type: type || 'success',
        text1: message,
        position,
      });
    } catch (error) {
      console.log('SHOW TOAST ERROR', error);
    }
  };
  