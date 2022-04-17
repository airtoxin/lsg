import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

export const Button: FunctionComponent<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    noBorder?: boolean;
    reverse?: boolean;
  }
> = ({ className, noBorder, reverse, children, ...restProps }) => (
  <button
    className={[
      "flex justify-center items-center font-bold p-0.5 bg-gray-900",
      "hover:bg-gray-700 active:bg-gray-500 disabled:border-gray-500 disabled:text-gray-500 disabled:pointer-events-none",
      noBorder ? "" : "border border-gray-50 rounded",
      reverse
        ? "bg-white text-gray-900 hover:bg-gray-200 active:bg-gray-400"
        : "",
      className ?? "",
    ].join(" ")}
    {...restProps}
  >
    {children}
  </button>
);
