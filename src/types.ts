export interface ChildrenProps {
  children: React.ReactNode;
}

export interface StringObject {
  [key: string]: string;
}

export interface User {
  ["id"]?: number;
  username: string;
  password: string;
  email: string;
}

export interface Quote {
  ["id"]?: number;
  code: string;
  quote: string;
  author: string;
  category: string;
  creator: string;
}

export interface Favorite {
  ["id"]?: number;
  code: string;
  username: string;
}
