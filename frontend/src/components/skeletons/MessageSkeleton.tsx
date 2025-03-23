// components/MessageSkeleton.jsx
import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-850 space-y-4">
      {/* Simulated Messages */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`flex items-end gap-2 mb-4 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {index % 2 === 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse flex-shrink-0" />
          )}
          <div
            className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${
              index % 2 === 0
                ? "bg-gray-700 rounded-bl-none"
                : "bg-teal-600 rounded-br-none"
            }`}
          >
            <div className="h-4 w-24 bg-gray-600 rounded animate-pulse mb-2" />
            <div className="h-3 w-12 bg-gray-600 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
