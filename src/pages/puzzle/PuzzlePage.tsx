import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { useEffect } from "react";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { PuzzlePane } from "./PuzzlePane";
import { SolutionPane } from "./SolutionPane";
import { usePuzzlePageQuery } from "./PuzzlePage.gen";

const QuerySchema = z.object({
  id: z.string(),
});

export const PuzzlePage: NextPage = () => {
  const router = useRouter();
  const result = QuerySchema.safeParse(router.query);
  console.log("@result", result);
  const { loading, error, data } = usePuzzlePageQuery({
    id: result.success ? result.data.id : "",
  });
  const setPuzzle = useSetRecoilState(PuzzleState);
  useEffect(() => {
    setPuzzle(data?.puzzle);
  }, [data?.puzzle, setPuzzle]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (data == null) return <div>Something wrong...</div>;

  return (
    <PuzzlePageLayout>
      <PuzzlePane puzzle={data.puzzle} />
      <SolutionPane />
    </PuzzlePageLayout>
  );
};
