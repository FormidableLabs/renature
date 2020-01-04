import React from 'react';

import './button.css';

interface Props {
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ onClick, children }) => (
  <button className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
