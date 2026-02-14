import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriorityStat {
  label: string;
  count: number;
  borderColor: string;
}

interface PriorityStatCardProps {
  data: PriorityStat;
}

const PriorityCard = ({ data }: PriorityStatCardProps) => {
  return (
    <Card className={cn("w-full max-w-sm shadow-sm border-l-4 md:border-l-16 flex flex-col gap-0 justify-center py-2", data.borderColor)}>
      <CardHeader className="px-2 sm:px-4 md:px-6 md:pb-2 h-8">
        <CardTitle className="text-sm md:text-xl font-bold uppercase text-muted-foreground tracking-wider">{data.label}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 md:px-6">
        <div className="text-xl md:text-4xl font-extrabold text-slate-900">{data.count.toString().padStart(2, "0")}</div>
      </CardContent>
    </Card>
  );
};

export default PriorityCard;
