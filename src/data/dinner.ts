import { IMenu } from '../app/types';

export const dinnerPrefix: IMenu[] = [
  {
    title: 'ヴォルネイコース',
    subTitle: 'Volnay',
    image: 'assets/images/dinner1.jpg',
    price: '¥7,480（税込、サービス料10%別途）',
    menu: [
      'アミューズ',
      '前菜（数種類の中からお選びいただけます）',
      'お魚料理',
      'お肉料理（数種類の中からお選びいただけます）',
      'チーズ又は、小さなサラダ',
      'デザート(数種類の中からお選びいただけます)',
      'パン、コーヒー',
    ],
  },
  {
    title: 'ボーヌコース',
    subTitle: 'Beaune',
    image: 'assets/images/dinner2.jpg',
    price: '¥10,450（税込、サービス料10%別途）',
    menu: [
      'アミューズ',
      '前菜２種（数種類の中からお選びいただけます）',
      'ボキャルドオマール（オマール海老のスープ仕立)',
      'メイン料理（数種類のお肉の中からお選びいただけます)',
      'チーズ又は、小さなサラダ',
      'デザート(数種類の中からお選びいただけます)',
      'パン、コーヒー',
    ],
  },
];

export const dinnerChief: IMenu[] = [
  {
    title: 'ムルソーコース',
    subTitle: 'Meursault',
    image: 'assets/images/dinner3.jpg',
    price: '¥14,850（税込、サービス料10%別途）',
    menu: [],
  },
  {
    title: 'モンラッシェコース',
    subTitle: 'Montrachet',
    image: 'assets/images/dinner1.jpg',
    price: '¥19,800（税込、サービス料10%別途）',
    option: '事前にご相談ください',
    menu: [],
  },
  {
    title: 'コルトンコース',
    subTitle: 'Corton',
    image: 'assets/images/dinner2.jpg',
    price: '¥26,400（税込、サービス料10%別途）',
    option: '事前にご相談ください',
    menu: [],
  },
];
