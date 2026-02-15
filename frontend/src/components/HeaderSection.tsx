import AddTaskButton from "./AddTaskButton";
import SearchBar from "./SearchBar";
import SortDropDown from "./SortDropDown";
import ViewSwitcher from "./ViewSwitcher";

interface HeaderSectionProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  sortDir: string;
  onSort: (field: string, dir: string) => void;
  onView: () => void;
}

const HeaderSection = ({ search, setSearch, sortBy, sortDir, onSort, onView }: HeaderSectionProps) => {
  return (
    <div className="w-full max-w-6xl p-4 rounded-[28px] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-auto flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SortDropDown sortBy={sortBy} sortDir={sortDir} onSortChange={onSort} />
          <AddTaskButton onClick={onView} />
          <ViewSwitcher />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
