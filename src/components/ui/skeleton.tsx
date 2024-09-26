const SkeletonLoader = () => {
    return (
      <li className="flex flex-col bg-[#262626] rounded-2xl w-[240px] h-[360px] gap-2 animate-pulse">
        <div className="w-[240px] h-[223px] bg-gray-700 rounded-t-[16px]"></div>
        <div className="flex flex-col gap-2 w-[200px] pb-4">
          <div className="flex flex-col items-start gap-2 w-full px-4">
            <div className="h-5 bg-gray-700 rounded w-full max-w-[180px]"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="flex justify-center gap-10 items-center w-[240px]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#F6F6F6] text-sm">:</p>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#F6F6F6] text-sm"></p>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </li>
    );
  };
  
  export default SkeletonLoader;
  