import React, { ChangeEvent, FC } from 'react';

import './toggle.css';

interface Props {
  on: boolean;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<Props> = ({ onChange, on }) => (
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
