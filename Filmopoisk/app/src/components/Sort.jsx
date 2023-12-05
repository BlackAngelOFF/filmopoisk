import '../index.css';
import Button from './Button';
import { useContext } from 'react';
import SortContext from './SortContext';

function Sort({props}) {
  let sort = useContext(SortContext);
  return (
    <div className={"choice-sort " + props.class}>
        <p className="label-sort">{props.title}</p>

        <Button props={{type: "button", classOut: "m sort", classIn: "inner-sort", innerHtml: "по возрастанию", onClick: sort.up}}/>
        <Button props={{type: "button", classOut: "sort", classIn: "inner-sort", innerHtml: "по убыванию", onClick: sort.down}}/>
    </div>
  );
}

export default Sort;