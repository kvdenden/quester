import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TargetingTips() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Info className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Targeting Tips</h4>
          <ul className="text-xs space-y-2">
            <li>
              • Use &quot;followed_by&quot; to target an account&apos;s
              followers
            </li>
            <li>
              • Use &quot;follows&quot; to target accounts that someone follows
            </li>
            <li>• Combine multiple rules to create complex targeting</li>
            <li>• Use &quot;exclude&quot; to filter out specific audiences</li>
            <li>• The estimated audience size updates in real-time</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
