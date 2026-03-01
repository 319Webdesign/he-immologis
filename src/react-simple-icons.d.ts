declare module "react-simple-icons" {
  import { ComponentType, SVGProps } from "react";

  interface IconProps extends SVGProps<SVGSVGElement> {
    name?: string;
    size?: number;
    fill?: string;
  }

  const Icon: ComponentType<IconProps>;
  export default Icon;
}
