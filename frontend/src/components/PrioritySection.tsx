import PriorityCard from "./PriorityCard";

export const priorityStats = {
  high: 5,
  medium: 12,
  low: 8,
};

const PRIORITY_CARDS = [
  {
    label: "High Priority",
    key: "high",
    count: priorityStats.high,
    borderColor: "border-l-rose-500",
    textColor: "text-rose-600",
  },
  {
    label: "Medium Priority",
    key: "medium",
    count: priorityStats.medium,
    borderColor: "border-l-amber-500",
    textColor: "text-amber-600",
  },
  {
    label: "Low Priority",
    key: "low",
    count: priorityStats.low,
    borderColor: "border-l-sky-500",
    textColor: "text-sky-600",
  },
];

const PrioritySection = () => {
  return (
    <div className="flex gap-4 w-full justify-center max-w-6xl">
      {PRIORITY_CARDS.map((card) => (
        <PriorityCard data={card} key={card.label} />
      ))}
    </div>
  );
};

export default PrioritySection;
