import Note from "../models/notes";
import * as Koa from "koa"
import { getManager, Repository } from 'typeorm';



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
    console.log("dsasadsad");
    const notes = await noteRepository.find();
    ctx.status= 200;
    ctx.body = notes;
}


static async create(ctx: any) {
    // if(!ctx.request.body){
    //     throw new Error("No Request Body")
    // }

    // console.log(ctx.request.body);

    // var t = ctx.request.body.title;
    // var d = ctx.request.body.description;

    // const note = await Note.make(t, d);
    // ctx.body = note;
    const noteRepository: Repository<Note> = getManager().getRepository(Note);
    let title = ctx.request.body.title;
    let description = ctx.request.body.description;
    const newNote:Note  = await Note.make( title, description );
    const note = await noteRepository.save(newNote);
    ctx.status= 201;
    ctx.body = note;
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