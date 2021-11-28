import { Children, FunctionComponent } from "react";

export const PuzzlePageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <div className="flex-grow flex flex-col sm:flex-row h-screen">
        {Children.map(children, (c, i) =>
          Children.count(children) !== i + 1 ? (
            <div className="block p-4 m-0 w-full h-auto sm:h-screen overflow-scroll border border-gray-50">
              {c}
            </div>
          ) : (
            <div className="block p-4 m-0 w-full mt-auto sm:mt-0 max-h-[50%] sm:max-h-full sm:h-screen flex-shrink-0 sm:flex-shrink overflow-scroll border border-gray-50">
              {c}
            </div>
          )
        )}
      </div>
    </div>
  );
};
