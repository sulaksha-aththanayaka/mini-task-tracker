import { LayoutGrid, Rows3 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ViewSwitcher = () => {
  return (
    <ToggleGroup 
      type="single" 
      defaultValue="card" 
      className="bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 h-10"
    >
      <ToggleGroupItem 
        value="card" 
        aria-label="Card View" 
        className="!rounded-l-2xl h-10 w-10 data-[state=on]:bg-white data-[state=on]:text-[#29235C] text-white transition-all hover:opacity-70 cursor-pointer"
      >
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="table" 
        aria-label="Table View" 
        className="!rounded-r-2xl h-10 w-10 data-[state=on]:bg-white data-[state=on]:text-[#29235C] text-white transition-all hover:opacity-70 cursor-pointer"
      >
        <Rows3 className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ViewSwitcher