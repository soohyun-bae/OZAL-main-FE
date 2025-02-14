import React from 'react';
import TagItem from './TagItem';

const TagList = ({data, className, onItemClick}) => {
  return (
    <ul>
      {data?.map((item) => {
        return <TagItem key={item.code} item={item} className={className} onClick={onItemClick}/>
      })}
    </ul>
  );
};

export default TagList;