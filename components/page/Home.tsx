import { NextPage } from "next";
import { InteractiveBlock } from "../ui/InteractiveBlock";

const items = Array.from(Array(25)).map((_, i) => i + 1);

export const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="grid gap-4 grid-cols-5 grid-rows-5">
        {items.map((i) => (
          <InteractiveBlock key={i} className="h-20 w-32">
            {i}
          </InteractiveBlock>
        ))}
      </div>
    </div>
  );
};
