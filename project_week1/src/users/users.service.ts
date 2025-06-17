import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto }  from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users: { id: number; name: string; age: number; sex: string }[] = [];
    private CounterID = 1;

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.CounterID++,
            ...createUserDto,
        };
        this.users.push(newUser);
        return newUser;
   }

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if(!user) {
            return null;
        }
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto){
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return {message: "user not found"};
        }

        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex];
    }

    delete(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)   return null;
        this.users.splice(userIndex, 1);

        this.users = this.users.map((user, index)=>({
            ...user,
            id: index + 1 // Resetting IDs after deletion to maintain sequential IDs
        }));

        this.CounterID = this.users.length > 0 ? this.users.length + 1 : 1; // Update CounterID for next user creation

        return { message: 'User deleted successfully' };

    }
}
