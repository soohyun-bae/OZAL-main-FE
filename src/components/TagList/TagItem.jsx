import React from 'react';

const TagItem = ({className, item, onClick}) => {
  return (
    <li>
      <div className={className} onClick={() => onClick(item.code)}>
        {item.name}
      </div>
    </li>
  );
};

export default TagItem;