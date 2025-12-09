import React from 'react'

const Image = ({path_name, className}: {path_name: string, className?: string}) => {
  return (
    <img src={path_name} className={className}/>
  );
};

export default Image;