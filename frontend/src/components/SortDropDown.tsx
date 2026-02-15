import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortDropDownProps {
  sortBy: string;
  sortDir: string;
  onSortChange: (field: string, dir: string) => void;
}

const SortDropDown = ({ sortBy, sortDir, onSortChange }: SortDropDownProps) => {
  return (
    <Select
      value={`${sortBy}-${sortDir}`}
      onValueChange={(value) => {
        const [field, dir] = value.split("-");
        onSortChange(field, dir);
      }}
    >
      <SelectTrigger className="w-[180px] bg-white/90 border-none shadow-sm rounded-2xl !h-10 hover:cursor-pointer hover:opacity-70">
        <div className="w-full truncate text-left">
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectItem value="createdAt-desc">Newest First</SelectItem>
        <SelectItem value="createdAt-asc">Oldest First</SelectItem>
        <SelectItem value="priority-asc">Priority: High to Low</SelectItem>
        <SelectItem value="priority-desc">Priority: Low to High</SelectItem>
        <SelectItem value="dueDate-asc">Deadline: Soonest First</SelectItem>
        <SelectItem value="dueDate-desc">Deadline: Furthest First</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortDropDown;
