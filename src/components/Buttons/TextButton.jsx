import React from 'react';
import { Link } from 'react-router-dom';

const TextButton = ({to, className, children, onClick}) => {
  return (
    to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
    ) : (
      <div onClick={onClick} className={className}>
      {children}
    </div>
    )
  );
};

export default TextButton;