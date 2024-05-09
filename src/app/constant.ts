import { ContactModel } from './types';

export const defaultContactModel = (): ContactModel => ({
  name: '',
  email: '',
  tel: '',
  message: '',
});
