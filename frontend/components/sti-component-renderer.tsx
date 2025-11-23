import { JSX } from "react";
import { stiComponents } from "./sti-components";

export interface StiComponentProps {
  type: string;
  config: typeof stiComponents[keyof typeof stiComponents] | { [key: string]: any };
  options?: { [key: string]: any };
  posts?: any;
};

export type StiComponentMap = {
  config: { [key: string]: any };
  options?: { [key: string]: any; };
  posts?: any;
};

export const StiComponentRenderer = (props: StiComponentProps) => {
  const Component = (stiComponents as Record<string, any>)[props.type] as (props: StiComponentMap) => JSX.Element | undefined;
  if (Component) {
    return <Component config={props.config} options={props.options} posts={props.posts} />;
  } else {
    return <div>Unknown component type {props.type}</div>;
  }
}
