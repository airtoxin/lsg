import { Children, FunctionComponent } from "react";

export const PuzzlePageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <div className="flex-grow flex flex-col sm:flex-row">
        {Children.map(children, (c, i) =>
          Children.count(children) !== i + 1 ? (
            <div className="block p-4 m-0 w-full h-full overflow-scroll border border-gray-50">
              {c}
            </div>
          ) : (
            <div className="block p-4 m-0 w-full flex-shrink-0 sm:flex-shrink overflow-scroll border border-gray-50">
              {c}
            </div>
          )
        )}
      </div>
    </div>
  );
};
