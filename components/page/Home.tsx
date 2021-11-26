import { NextPage } from "next";

const items = Array.from(Array(25)).map((_, i) => i + 1);

export const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="grid gap-4 grid-cols-5 grid-rows-5">
        {items.map((i) => (
          <div
            key={i}
            className="flex justify-center items-center h-20 w-32 border border-gray-50"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};
