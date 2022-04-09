import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { PuzzleProblemSection } from "./PuzzleProblemSection";
import { PuzzleRulesSection } from "./PuzzleRulesSection";
import { usePuzzlePageQuery } from "./PuzzlePage.gen";
import { gql } from "@apollo/client";
import { useEffect } from "react";
import {
  PuzzleProblemState,
  PuzzleRulesState,
  PuzzleTestResultsState,
  PuzzleTestsState,
} from "../../states2";
import { useSetRecoilState } from "recoil";

gql`
  query PuzzlePage($id: ID!) {
    puzzle(id: $id) {
      description
      input
      rules {
        fixed
        from
        to
      }
      tests {
        step
        isAny
        expect
      }
    }
  }
`;

const QuerySchema = z.object({
  id: z.string(),
});

export const PuzzlePage: NextPage = () => {
  const router = useRouter();
  const { id } = QuerySchema.parse(router.query);
  const { loading, error, data } = usePuzzlePageQuery({ variables: { id } });

  const setPuzzleProblem = useSetRecoilState(PuzzleProblemState);
  const setPuzzleRules = useSetRecoilState(PuzzleRulesState);
  const setPuzzleTests = useSetRecoilState(PuzzleTestsState);
  const PuzzleTestResults = useSetRecoilState(PuzzleTestResultsState);
  useEffect(() => {
    if (data != null) {
      setPuzzleProblem(data.puzzle);
      setPuzzleRules(data.puzzle.rules);
      setPuzzleTests(data.puzzle.tests);
      PuzzleTestResults(data.puzzle.tests.map(() => null));
    }
  }, [
    PuzzleTestResults,
    data,
    setPuzzleProblem,
    setPuzzleRules,
    setPuzzleTests,
  ]);

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
      <PuzzleProblemSection />
      <PuzzleRulesSection />
    </PuzzlePageLayout>
  );
};

PuzzlePage.getInitialProps = async () => ({ pageProps: {} });
