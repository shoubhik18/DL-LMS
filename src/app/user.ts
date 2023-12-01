export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture: Blob | null | any;
  role: string;
  // constructor(id: number, email: string, password: string) {
  //   this.id = id;
  //   this.email = email;
  //   this.password = password;
  // }
}

// export interface newUser {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
// }

export interface login {
  email: string;
  password: string;
}

export interface course {
  title: string;
  picture: string | any;
  archive: boolean;
  updatedAt: string;
  createdAt: string;
  description: string;
  livelink: string;
}
