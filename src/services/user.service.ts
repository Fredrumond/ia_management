import { User } from '../types/user.types';

export default class UserService {
    constructor() {
        console.log('UserService constructor');
     }

    async createUser(user: User) {
        return console.log(user);
    }
}