import { Length, validate, Validate, IsFQDN, IsNotEmpty, IsDefined } from 'class-validator';
import InvalidModelError from './invalidModelError';
import { IsPhoneNumber } from './validators';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    PrimaryColumn,
    Generated,
    BeforeInsert,
    BeforeUpdate,
    //Index,
} from 'typeorm';
import User from './user';



//database table is called notes
@Entity()
export default class Note {
    @PrimaryGeneratedColumn("uuid")
    id:String;
    
    @Column('text')
    @Length(1,70)
    title: string

    @Column('text')
    @Length(1,500)
    description: string

    @IsDefined()
    @ManyToOne(type => User, user => user.notes, {
        cascade:true,
        nullable:false,
    } )
    user: User

    // @Validate(IsEmail) 
    // email: string

    // @Validate(IsPhoneNumber) 
    // phoneNumber: string

    // @IsFQDN()
    // url:string

    private constructor(title: string, description: string, user: User) {
        this.title = title;
        this.description = description;
        this.user = user;
    }

    static async make(title: string, description: string, user: User): Promise<Note> {
        var newNote: Note = new Note(title,description,user);
        return newNote;
    }

    @BeforeInsert()
    @BeforeUpdate()
    static async validateData(note:Note) {
        let error = await validate(note);
        if (error.length > 0) {
            console.log(error);
            throw new InvalidModelError("invalid note object");
        }
        return note;
    }



}


// async function validateNote() {
//     let testNote:Note;
//     try {
//          testNote = await Note.make("title", "description","test@gmail.com", "11111111", 'www.google.com');
//          console.log(testNote)
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return testNote;
// }
// validateNote();