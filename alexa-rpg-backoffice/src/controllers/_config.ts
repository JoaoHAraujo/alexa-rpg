import { BaseHttpController, controller, interfaces } from 'inversify-express-utils';

@controller('')
export class ConfigController extends BaseHttpController implements interfaces.Controller {}
