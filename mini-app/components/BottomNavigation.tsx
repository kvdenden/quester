import Link from "next/link";
import { Home, PlusCircle, User, Trophy } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <Link href="/surveys" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Surveys</span>
        </Link>
        <Link href="/create" className="flex flex-col items-center">
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Create</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center">
          <Trophy className="h-6 w-6" />
          <span className="text-xs mt-1">Leaderboard</span>
        </Link>
      </div>
    </nav>
  );
}
