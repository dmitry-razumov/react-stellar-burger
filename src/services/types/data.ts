export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  uuid: string
};

export type TOrder = {
  _id: string
  createdAt: string,
  ingredients:Array<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
 }

 export type TSendOrder = {
    id: number;
    order: {
      ingredients: ReadonlyArray<TIngredient>;
      createdAt: string;
      number: number;
      name: string;
    }
 }

export type TUser = {
  email: string;
  name: string;
}

export type TUserForm = TUser & { password: string }