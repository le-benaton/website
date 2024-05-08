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
