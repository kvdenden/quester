"use client";
import ProfileSheet from "./ProfileSheet";
export default function TopNavigation() {
  return (
    <nav className="absolute top-0 left-0 max-w-md mx-auto right-0 bg-primary px-4 z-10">
      <div className="flex justify-between items-center h-12">
        <div className="flex-1" />
        <ProfileSheet />
      </div>
    </nav>
  );
}
