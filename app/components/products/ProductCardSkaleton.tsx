export const ProductCardSkaleton = () => {
  return (
    <div>
      <div className="py-5">
        <h1 className="bg-gray-200 h-10 w-56"></h1>
      </div>
      <div className="grid grid-cols-2 gap-1 py-3">
        {Array.from({ length: 10 }, (_, i) => i).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-4 col-span-1 shadow-md m-auto rounded-md "
          >
            <div className="col-span-1 h-40 w-40 bg-gray-200" />
            <div className="col-span-1 m-auto">
              <h2 className="text-2xl py-2 bg-gray-200 h-3 w-36"></h2>
              <p className="text-base py-2"></p>
              <p className="font-semibold bg-gray-200 h-3 w-36"></p>
              <div className="py-3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
