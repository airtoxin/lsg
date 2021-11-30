import { NextPage } from "next";
import { InteractiveBlock } from "../components/InteractiveBlock";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { pagesPath } from "../utils/$path";

export const HomePage: NextPage = () => {
  const { isLoading, error, data } = trpc.useQuery(["page.Home"]);
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (data == null) return <div>Something wrong...</div>;

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="grid gap-4 grid-cols-5 grid-rows-5">
        {data.puzzleIds.map((id, i) => (
          <Link key={id} href={pagesPath.puzzle._id(id).$url()}>
            <a>
              <InteractiveBlock className="h-20 w-32">{i + 1}</InteractiveBlock>
            </a>
          </Link>
        ))}
        <Link href={pagesPath.puzzle.edit.$url()}>
          <a>
            <InteractiveBlock className="h-20 w-32">
              Edit puzzle
            </InteractiveBlock>
          </a>
        </Link>
      </div>
    </div>
  );
};
