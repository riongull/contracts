import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters");

export const usernameValidation = z.string().refine(
  // put dash SDK logic here to check if username already exists.
  async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return !value.includes("error");
  },
  {
    message: "No 'error' allowed in first name",
  }
);
// const mySchema = z
//   .object({
//     myString: z.string().min(5),
//     myUnion: z.union([z.number(), z.boolean()]),
//   })
//   .describe("My neat object schema");

// const jsonSchema = zodToJsonSchema(mySchema, "mySchema");
