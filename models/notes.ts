import { Length, validate } from 'class-validator';
import InvalidModelError from './invalidModelError';
const uuidv4 = require('uuid/v4');
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    //Index,
} from 'typeorm';


//database table is called notes
@Entity()

export default class Note {
    @PrimaryGeneratedColumn(uuidv4)
    id:String;

    @Column('text')
    @Length(1,70)
    title: string

    @Column('text')
    @Length(1,500)
    description: string

    private constructor(title: string, description: string ) {
        this.title = title;
        this.description = description;
    }

    static async make(title: string, description: string ): Promise<Note> {

        var newNote: Note = new Note(title,description);

        let error = await validate(newNote)
        if (error.length > 0) {
            throw new InvalidModelError("invalid note object");
        }
        return newNote;
    }


    


}



