"use client"

interface PageBackgroundProps {
  variant?: "default" | "blue" | "purple" | "green" | "pink";
}

export function PageBackground({ variant = "default" }: PageBackgroundProps) {
  const gradients = {
    default: "from-blue-200/30 via-purple-200/30 to-pink-200/30",
    blue: "from-blue-200/40 via-indigo-200/30 to-cyan-200/30",
    purple: "from-indigo-200/30 via-purple-200/30 to-pink-200/30",
    green: "from-teal-100/20 via-green-100/20 to-lime-100/20",
    pink: "from-pink-200/40 via-purple-200/30 to-blue-200/30"
  };

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br ${gradients[variant]} backdrop-blur-[2px] -z-10 pointer-events-none`} 
      aria-hidden="true"
    />
  );
} 