import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";
import { AUTH_SERVICE } from "../../common/services.name";

@Injectable()
export class AppService {
  constructor(
    // @Inject(AUTH_SERVICE) private readonly authService: ClientProxy
  ) { }


}