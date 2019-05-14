import { Length, validate } from 'class-validator';
import InvalidModelError from './invalidModelError';



export default class Note {
    @Length(1,70)
    title: string
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



