import React from 'react';

import './toggle.css';

interface Props {
  checked: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: React.FC<Props> = ({ onChange, checked }) => (
  <div className="toggle">
    <input
      type="checkbox"
      name="toggle"
      id="toggle"
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor="toggle" />
  </div>
);

export default Toggle;
