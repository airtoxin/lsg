import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

export const Button: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, ...restProps }) => (
  <button
    className={[
      "flex justify-center items-center border border-gray-50 font-bold rounded p-0.5 bg-gray-900 hover:bg-gray-700 active:bg-gray-500",
      className ?? "",
    ].join(" ")}
    {...restProps}
  >
    {children}
  </button>
);
