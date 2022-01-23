import { NextPage } from "next";
import { InteractiveBlock } from "../components/InteractiveBlock";
import Link from "next/link";
import { pagesPath } from "../utils/$path";
import gql from "graphql-tag";
import { useHomePageQuery } from "./HomePage.gen";

gql`
  query HomePage {
    puzzles {
      id
    }
    newPuzzles {
      id
    }
  }
`;

export const HomePage: NextPage = () => {
  const { isLoading, error, data } = useHomePageQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (data == null) return <div>Something wrong...</div>;

  return (
    <div className="p-4 flex flex-col min-h-screen w-full justify-center items-center overflow-scroll">
      <div className="p-4">
        <h2 className="pb-2">Main puzzles</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {data.puzzles.map(({ id }, i) => (
            <Link key={id} href={pagesPath.puzzle._id(id).$url()}>
              <a>
                <InteractiveBlock className="h-20 w-32">
                  {i + 1}
                </InteractiveBlock>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="pb-2">Newly added</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {data.newPuzzles.map(({ id }, i) => (
            <Link key={id} href={pagesPath.puzzle._id(id).$url()}>
              <a>
                <InteractiveBlock className="h-20 w-32">
                  {i + 1}
                </InteractiveBlock>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          <Link href={pagesPath.puzzle.edit.$url()}>
            <a>
              <InteractiveBlock className="h-20 w-32">
                Edit puzzle
              </InteractiveBlock>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
