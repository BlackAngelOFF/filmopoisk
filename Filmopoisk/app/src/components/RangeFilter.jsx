import '../index.css';
import { useState } from 'react';

function RangeFilter({props}) {

  let [Disabled, SetDis] = useState(true);
  let [minE, SetMinE] = useState(props.minStart);

  const changeHandle = () => {
    let curr = Number(document.querySelectorAll(`#${props.id} input`)[0].value);
    if (curr >= props.minStart && curr <= props.maxStart){
      SetDis(false);
      SetMinE(curr);
    }
    else{
      SetDis(true);
      SetMinE(props.minStart);
      document.querySelectorAll(`#${props.id} input`)[1].value = "";
    }
  } 

  return (
      <div className="choice-filter range-filter" id={props.id}>
            <p className="label-choice m">{props.title}</p>

            <p className="label-choice m">{props.startTitle}</p>
            <input type="number" min={props.minStart} max={props.maxStart} placeholder={props.minStart} onChange={changeHandle}/>
            
            <p className="label-choice m ml">{props.endTitle}</p>
            <input type="number" min={minE} max={props.maxStart} placeholder={props.maxStart} disabled={Disabled}/>

            <p className="label-choice ml">{props.measure}</p>
      </div>
  );
}

export default RangeFilter;