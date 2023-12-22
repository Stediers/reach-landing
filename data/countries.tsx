import { IndiaSVG } from "@components/svg/Countries";
export interface Country {
  name: string;
  code: string;
  abbreviation: string;
  svg: JSX.Element | null;
  maxLength: number;
}
export const countries: { [key: string]: Country } = {
  India: {
    name: "India",
    code: "+91",
    abbreviation: "IN",
    svg: <IndiaSVG />,
    maxLength: 10,
  },
  "United States": {
    name: "United States",
    code: "+1",
    abbreviation: "US",
    svg: null,
    maxLength: 10,
  },
};
