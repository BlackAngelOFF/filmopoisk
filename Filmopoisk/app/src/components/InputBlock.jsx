import { useState } from 'react';
import '../index.css';
import Required from './Requried';
import Button from './Button';

function InputBlock({props}) {

  let [currList, setCurrList] = useState([...props.list]);

  const add = () => {
    if(currList.length >= 3) return;
    setCurrList([...currList, props.temp]);
    console.log(currList);
  }

  const sub = () => {
    setCurrList(currList.slice(0,currList.length - 1));
  }

  return (
      <div className="input-block" id={props.id}>

          <div className="input-block-title">
              <label className="input-title">{props.title}{props.isReq ? <Required/> : ""}</label>
              {
                props.isMult ?
                <Button props={{type: "button", classOut: "add-button", classIn: "inner-button", innerHtml: "+", onClick: add}}/>
                : ""
              }

              {
                currList.length > 1 ? 
                <Button props={{type: "button", classOut: "remove-button", classIn: "inner-button", innerHtml: "-", onClick: sub}}/>
                : ""
              }
              
          </div>
                
          <div className="list">
              {currList.map(
                (elem, i) => 
                <div className="input-line" key={props.id+"-"+i}>
                  {elem}
                </div>
              )}
          </div>
      </div>
  );
}

export default InputBlock;