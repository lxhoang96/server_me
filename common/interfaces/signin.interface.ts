import { SessionInterface } from "./session.interface";



export class SigninInterface{

  username: string;

  type: string;

  password: string;

  sessionDTO: SessionInterface;
}
