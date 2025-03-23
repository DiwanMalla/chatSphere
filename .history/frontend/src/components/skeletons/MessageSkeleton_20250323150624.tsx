const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-start gap-2">
          {/* Profile Picture Skeleton */}
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>

          {/* Message Bubble Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-24 h-3 bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
