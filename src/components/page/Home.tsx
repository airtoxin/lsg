import { NextPage } from "next";
import { InteractiveBlock } from "../ui/InteractiveBlock";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

export const Home: NextPage = () => {
  const { isLoading, error, data } = trpc.useQuery(["page.Home"]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (data == null) return <div>Something wrong...</div>;

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="grid gap-4 grid-cols-5 grid-rows-5">
        {data.puzzleIds.map((id, i) => (
          <Link key={id} href={`/puzzle/${id}`} prefetch={true}>
            <a>
              <InteractiveBlock className="h-20 w-32">{i + 1}</InteractiveBlock>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
