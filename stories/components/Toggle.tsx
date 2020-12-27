import React from 'react';

import './toggle.css';

interface Props {
  on: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: React.FC<Props> = ({ onChange, on }) => (
  <div className="toggle">
    <input
      type="checkbox"
      name="toggle"
      id="toggle"
      onChange={onChange}
      checked={on}
    />
    <label htmlFor="toggle" />
  </div>
);

export default Toggle;
