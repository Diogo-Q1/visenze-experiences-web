import type { FC, ReactElement } from 'react';

const IconTriggeredGridIcon: FC<{ className?: string }> = ({ className }): ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' className={className} viewBox='0 -960 960 960' data-pw='itg-icon'>
    {/* eslint-disable-next-line max-len */}
    <path fill='#000000' d='M80-360v-240q0-33 23.5-56.5T160-680q33 0 56.5 23.5T240-600v240q0 33-23.5 56.5T160-280q-33 0-56.5-23.5T80-360Zm280 160q-33 0-56.5-23.5T280-280v-400q0-33 23.5-56.5T360-760h240q33 0 56.5 23.5T680-680v400q0 33-23.5 56.5T600-200H360Zm360-160v-240q0-33 23.5-56.5T800-680q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280q-33 0-56.5-23.5T720-360Zm-360 80h240v-400H360v400Zm120-200Z'></path>
  </svg>
);

export default IconTriggeredGridIcon;
