function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex w-52 flex-col gap-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;