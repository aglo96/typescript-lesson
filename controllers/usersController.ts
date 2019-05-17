import User from "../models/user";
import * as Koa from "koa"
import { getManager, Repository } from 'typeorm';
import { Repos } from "jest-changed-files/build/types";
import Note from "../models/note";
import { validate } from "class-validator";
import InvalidModelError from "../models/invalidModelError";

export default class UsersController {

    static async create(ctx: any) {
        // const noteRepository: Repository<Note> = getManager().getRepository(Note)
        // const note1:Note  = await Note.make( "title1", "description1");
        // await noteRepository.save(note1);
        // const note2:Note  = await Note.make( "title2", "description2");
        // await noteRepository.save(note2);

        const userRepository: Repository<User> = getManager().getRepository(User);
        let name = ctx.request.body.name;
        let email = ctx.request.body.email;
        let phoneNumber = ctx.request.body.phoneNumber;
        const newUser = await User.make(name, email, phoneNumber);
        const validatedUser = await User.validateData(newUser);

       // newUser.notes = [note1,note2];
        
        const user = await userRepository.save(validatedUser);
        ctx.status = 200;
        ctx.body = validatedUser;
    }

    static async getAll(ctx: any) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const users = await userRepository.find();
        ctx.status = 200;
        ctx.body = users;
    }

    static async get(ctx: any) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const user = await userRepository.findOne(ctx.params.id);
        ctx.status = 200;
        ctx.body = user;
    }
    
    static async getNotesFromUser(ctx: any) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        //const user = await userRepository.findOne(ctx.params.id, {relations: ["notes"]});
        //this is more efficient
        const user = await userRepository.findOne(ctx.params.id);
        ctx.status = 200;
        ctx.body = user.notes;
    }

}



