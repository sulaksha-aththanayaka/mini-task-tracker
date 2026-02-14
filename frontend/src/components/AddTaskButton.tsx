import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddTaskButton = () => {
  return (
    <Button className="h-10 rounded-2xl px-6 font-semibold shadow-lg transition-all bg-indigo-500 hover:bg-indigo-600 text-white border-none hover:cursor-pointer">
      <Plus/> Add New Task
    </Button>
  );
};

export default AddTaskButton;
