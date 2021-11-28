import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  VoidFunctionComponent,
} from "react";

export const Input: VoidFunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    noBorder?: boolean;
  }
> = ({ noBorder, ...inputProps }) => (
  <input
    className={
      noBorder
        ? "bg-transparent pl-2 pr-2 w-full outline-none"
        : "bg-transparent pl-2 pr-2 w-full outline-none border border-gray-50 rounded"
    }
    {...inputProps}
  />
);
