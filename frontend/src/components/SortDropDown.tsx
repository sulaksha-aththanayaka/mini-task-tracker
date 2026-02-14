import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SortDropDown = () => {
  return (
    <Select defaultValue="newest">
      <SelectTrigger className="w-[180px] bg-white/90 border-none shadow-sm rounded-2xl !h-10 hover:cursor-pointer hover:opacity-70">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="priority-high">Priority: High to Low</SelectItem>
        <SelectItem value="priority-low">Priority: Low to High</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortDropDown