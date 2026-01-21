import './style.scss';

import Filter from '@/components/Filter';

export default function ComponentHeader(props) {
  return (
    <div className="component-header-container">
      <div className="component-header-title">{props.title}</div>

      {props.isChildrenShown ? props.children : <Filter {...props} />}
    </div>
  );
}
