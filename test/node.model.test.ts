import Note from "../models/notes";
import InvalidModelError from "../models/invalidModelError";

// jest.mock("../models/notes");


test('creating invalid note should throw an error', () => {
    // expect(sum(1, 2)).toBe(3);
    // expect(() => { Note.make("", "") }).toThrow(new InvalidModelError("invalid note object"))

    expect(Note.make("", "")).rejects.toEqual(new InvalidModelError("invalid note object"))
});