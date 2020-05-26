export interface AuthLogin {
  token: string;
  email: string;
  password: string;
  user_id: string;
}

export interface AuthRegistr {
  token: string;
  email: string;
  password: string;
  user_id: string;
}

export interface Contact {
  _id: string;
  name: string;
  tel: string;
  user_id: string;
}
