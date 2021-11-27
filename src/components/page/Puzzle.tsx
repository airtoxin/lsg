import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { PuzzlePanes } from "../models/puzzle/PuzzlePanes";

const QuerySchema = z.object({
  id: z.string(),
});

export const Puzzle: NextPage = () => {
  const { id } = QuerySchema.parse(useRouter().query);
  const { isLoading, error, data } = trpc.useQuery(["page.Puzzle", { id }]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (data == null) return <div>Something wrong...</div>;

  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <PuzzlePanes puzzle={data.puzzle} />
    </div>
  );
};
