import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  result: string | number;
  subtitle?: string;
  className?: string;
}

const ResultCard = ({ title, result, subtitle, className }: ResultCardProps) => {
  return (
    <Card className={cn("shadow-elevated border-primary/20 animate-fade-in", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-primary">{result}</p>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
