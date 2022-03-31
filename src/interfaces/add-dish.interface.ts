export interface IAddDishForm {
  name: string;
  price: string;
  file: FileList;
  description: string;
  options: {
    name: string;
    choices?: {
      name: string;
      extra: string;
    }[];
    extra: string;
  };
}