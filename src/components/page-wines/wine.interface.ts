export interface WineInterface {
  threadId: number;
  type: string;
  name: string;
  label: string;
  year: number;
  number: {
    purchase: number;
    used: number;
  };
  price: {
    sell: number;
  };
  images: string[];
}
