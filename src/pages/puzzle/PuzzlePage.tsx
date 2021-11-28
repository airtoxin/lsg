import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { PuzzlePanes } from "./PuzzlePanes";
import { useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { useEffect } from "react";

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
  if (error) return <div>An error has occurred</div>;
  if (data == null) return <div>Something wrong...</div>;

  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <PuzzlePanes />
    </div>
  );
};
