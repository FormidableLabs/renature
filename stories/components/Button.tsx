import React, { FC, MouseEvent } from 'react';

import './button.css';

interface Props {
  onClick: (ev: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<Props> = ({ onClick, children }) => (
  <button className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
