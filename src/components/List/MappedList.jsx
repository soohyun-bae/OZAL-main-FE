import style from './List.module.scss';

const MappedList = ({ data, renderItem, className }) => {
  return (
    <ul className={className}>
      {data?.map((item, index) => (
        <li key={index}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default MappedList;