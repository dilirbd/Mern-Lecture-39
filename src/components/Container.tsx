import type React from "react";

const Container_centered = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`mx-auto ${className}`}>
      {children}
    </div>
  )
}

const Test_Func = () => {
  return (
    <div></div>
  );
}

export default Container_centered;
export { Test_Func };