import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { useEffect } from "react";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { PuzzlePane } from "./PuzzlePane";
import { SolutionPane } from "./SolutionPane";

const QuerySchema = z.object({
  id: z.string(),
});

export const PuzzlePage: NextPage = () => {
  const { id } = QuerySchema.parse(useRouter().query);
  const { isLoading, error, data } = trpc.useQuery(["page.Puzzle", { id }]);
  const setPuzzle = useSetRecoilState(PuzzleState);
  useEffect(() => {
    setPuzzle(data?.puzzle);
  }, [data?.puzzle, setPuzzle]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (data == null) return <div>Something wrong...</div>;

  return (
    <PuzzlePageLayout>
      <PuzzlePane />
      <SolutionPane />
    </PuzzlePageLayout>
  );
};
