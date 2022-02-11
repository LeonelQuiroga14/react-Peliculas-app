import  { CSSProperties, ReactNode } from "react";

export const Button = (props: buttonProps) => {
  return (
    <button type={props.type} className={props.className}
    onClick={props.onClick} 
    disabled={props.disabled}
    >
      
      {" "}
      {props.children}
    </button>
  );
};

interface buttonProps {
  children: ReactNode;
  onClick?(): void;
  type:"button" | "submit";
  disabled:boolean;
  className:string,
  style:CSSProperties;
}
Button.defaultProps = {
  type:"button",
  disabled:false,
  className:"btn btn-primary",
  style:null
}
