import React from "react";

function CustomProgress({
  progress,
  buffer,
}: Readonly<{
  progress: number;
  buffer: number;
}>) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-lg bg-white">
      {/* Buffered section */}
      <div
        className="absolute left-0 top-0 h-full bg-gray-200"
        style={{
          width: `${buffer}%`,
          backgroundImage:
            "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 1px, transparent 6px)",
        }}
      ></div>
      {/* Progress section */}
      <div
        className="absolute left-0 top-0 h-full bg-gray-400"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}

export default CustomProgress;
