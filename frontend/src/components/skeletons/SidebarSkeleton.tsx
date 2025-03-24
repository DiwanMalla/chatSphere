// components/SidebarSkeleton.jsx

const SidebarSkeleton = () => {
  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* Title Placeholder */}
      <div className="h-6 w-1/3 bg-gray-700 rounded animate-pulse" />

      {/* User List Placeholders */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-gray-700 rounded-md animate-pulse"
        >
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-600" />
          {/* Name Placeholder */}
          <div className="h-4 w-2/3 bg-gray-600 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
