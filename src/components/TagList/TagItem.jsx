import React from 'react';
import TextButton from '../Buttons/TextButton';

const TagItem = ({className, item, onClick}) => {
  return (
    <li>
      <TextButton className={className} onClick={() => onClick(item.code)}>
        {item.name}
      </TextButton>
    </li>
  );
};

export default TagItem;