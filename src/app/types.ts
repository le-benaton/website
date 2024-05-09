export interface IItem {
  title: string;
  body: string;
  image?: string;
}

export interface IMenu {
  title: string;
  subTitle?: string;
  option?: string;
  price: string;
  image: string;
  menu: string[];
}

export type ContactModel = {
  name: string;
  email: string;
  tel: string;
  message: string;
};

// endpoint: https://api.v5.tipsys.me/thirdparty/concent/mail
export interface IRequestRdlaboMail {
  from: string;
  name: string;
  message: string;
}
