import {z} from "zod" 

export const studentValidationSchema = z.object({
    firstName:z.string(),
    lastName:z.string(),
    matricNumber: z.string(),
    department:z.string(),
    // isActive?:z.boolean()
}).required();

export type StudentInfo = z.infer<typeof studentValidationSchema>;