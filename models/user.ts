import { Length, validate, Validate, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import InvalidModelError from './invalidModelError';
const uuidv4 = require('uuid/v4');
import Note from './note'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
    Generated,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id:String;

    @Column('text')
    @IsNotEmpty()
    name: string;

    @Column('text')
    @IsEmail()
    email: string;

    @Column('text')
    @Validate(IsPhoneNumber)
    phoneNumber: string;

    @OneToMany(type => Note, note => note.user, {eager:true})
    notes: Note[];


    private constructor(name:string, email:string, phoneNumber:string) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    static async make(name:string, email:string, phoneNumber:string ) {
        let newUser: User = new User(name, email, phoneNumber);
       // let validatedUser = await this.validateData(newUser);
        return newUser;
    }

    @BeforeInsert()
    @BeforeUpdate()
    static async validateData(user: User) {
        let error = await validate(user);
        if (error.length>0) {
            console.log(error)
            throw new InvalidModelError("invalid User object");
        }
        return user;
    }
}



// async function validateUser() {
//     let testUser: User;
//     try {
//          testUser = await User.make("ag lo", "awesomeag@gmail.com", '99999999');
//          console.log(testUser)
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return testUser;
// }
// validateUser();

