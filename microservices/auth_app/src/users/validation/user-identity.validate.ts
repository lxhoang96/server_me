import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { CreateUserInterface } from '../../../../../common/interfaces/create-user.interface';

@ValidatorConstraint({ name: 'checkInfo', async: false })
export class CheckIdentity implements ValidatorConstraintInterface {
  validate(user: CreateUserInterface, args: ValidationArguments) {
    if( user.discordId || user.telegramId || user.email || user.phoneNumber)  // for async validations you must return a Promise<boolean> here
    {
        return true;
    }
    return false;
}

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Need at least one infomation for identity';
  }
}