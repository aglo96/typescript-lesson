import Note from "../models/note";
import * as Koa from "koa"
import { getManager, Repository } from 'typeorm';
import { Context } from "istanbul-lib-report";
import User from "../models/user";
import { validate } from "class-validator";
import InvalidInputError  from "./invalidInputError";


export default class NoteController {
static async get(ctx: Koa.Context) {
    // const note =  await Note.make("title", "description");
    // ctx.body = note;
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const note = await noteRepository.findOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = note;
}

static async getAll(ctx: any) {
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const notes = await noteRepository.find();
    ctx.status= 200;
    ctx.body = notes;
}


static async create(ctx: any) {
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const userRepository: Repository<User> = getManager().getRepository(User);
    let title: string = ctx.request.body.title;
    let description: string = ctx.request.body.description;
    let userId: string = ctx.request.body.userId;

    const validateInput = NoteController.validateRequestParams(title,description,userId);
    if (!validateInput) {
        throw new InvalidInputError("invalid input");
    }
    const user = await userRepository.findOne({id: userId});
    if (!user) {
        throw new Error("user does not exist");     
    }
    const newNote:Note  = await Note.make( title, description, user);
    const note = await noteRepository.save(newNote);
    ctx.status= 201;
    ctx.body = note;
}

static validateRequestParams(title:string, description:string, userId:string): boolean {
    if (title.length>70 ||
         title.length<1 || 
         description.length>500 || 
         description.length<0 || 
         userId.length<1)
        return false; 
    return true;
    } 


static async deleteNote(ctx: any) {
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const noteToRemove = await noteRepository.findOne(ctx.params.id);
    if (!noteToRemove) {
        ctx.status = 400;
        ctx.body = "note does not exist in db";
    }
    await noteRepository.remove(noteToRemove);
    ctx.status = 204;
}

static async findByTitle(ctx: any) {
    console.log(ctx.params.id);
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const note = await noteRepository.find( {title: ctx.params.id} );
    ctx.status = 200;
    ctx.body = note;
}

static async findByDescription(ctx: any) {
    console.log(ctx.params.id);
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    const note = await noteRepository.find( {description: ctx.params.id} );
    ctx.status = 200;
    ctx.body = note;
}

}