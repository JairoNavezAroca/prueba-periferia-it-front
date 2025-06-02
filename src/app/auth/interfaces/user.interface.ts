export interface IUser {
  id: number;
  name: string;
  email: string;
  flag_admin: boolean;
}

export class User implements IUser {
  id: number = 0;
  name: string = '';
  email: string = '';
  flag_admin: boolean = false;
}
