export interface User {
  email: string,
  password: string
}

export interface Answer {
  answers: string,
  user?: string,
  _id?: string
}
