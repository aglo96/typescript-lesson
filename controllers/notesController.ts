import Note from "../models/notes";
import * as Koa from "koa"

export default class NoteController {
    

static async get(ctx: Koa.Context) {
    const note =  await Note.make("title", "description");
    ctx.body = note;
}
static async get1(ctx: Koa.Context) {
    const note = await Note.make("title", "description");
    ctx.body = note;
}
static async get2(ctx: Koa.Context) {
    const note = await Note.make("title", "description");
    ctx.body = note;
}
static async get3(ctx: Koa.Context) {
    const note = await Note.make("title", "description");
    ctx.body = note;
}

static async create(ctx: any) {

    if(!ctx.request.body){
        throw new Error("No Request Body")
    }

    console.log(ctx.request.body);

    var t = ctx.request.body.title;
    var d = ctx.request.body.description;

    const note = await Note.make(t, d);
    ctx.body = note;
}

}