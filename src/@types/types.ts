export type TUserAddress = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};
export type TUserCompany = {
  bs: string;
  catchPhrase: string;
  name: string;
};
export type TUser = {
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  email: string;
  address: TUserAddress;
  company: TUserCompany;
};
