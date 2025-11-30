import type React from "react";

const Container_centered = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`${className} mx-auto`}>
      {children}
    </div>
  )
}

const Test_func = () => {
  return (
    <div></div>
  );
}

export default Container_centered;
export { Test_func };