import { user } from 'src/app/Modules/Users/Models/user';

export interface userNode {
  user: user;
  userChildren: userNode[];
}
