import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const SVGHeart = () => (
  <svg
    style={{
      width: "1.14062em",
      height: "1em",
      fill: "currentcolor",
      overflow: "hidden",
    }}
    viewBox="0 0 1168 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M801.35997607 90.12580585a271.06400254 271.06400254 0 0 0-210.75589023 103.28167419A265.33956995 265.33956995 0 0 0 380.00944745 90.12580585 275.41779702 275.41779702 0 0 0 110.15483117 369.49426862a358.70426807 358.70426807 0 0 0 79.01330246 208.57899297 1908.89688621 1908.89688621 0 0 0 368.54061823 344.35287241 59.42122806 59.42122806 0 0 0 70.22508838 0 1976.30007082 1976.30007082 0 0 0 368.54061739-344.43349832 373.37816657 373.37816657 0 0 0 76.7557793-208.57899298A275.82092578 275.82092578 0 0 0 801.35997607 90.12580585z"></path>
  </svg>
);

export const IconHeart = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SVGHeart} {...props} />
);
