import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  status: z.string().min(1, "Please select a status"),
  priority: z.string().min(1, "Please select a priority"),
  dueDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    { message: "Due date must be in the future" },
  ),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
