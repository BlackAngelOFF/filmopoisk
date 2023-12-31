import '../index.css';

function CompareFilter({props}) {
  return (
    <div className="choice-filter compare-filter" id={props.id}>
        <label className="label-choice m">{props.title}</label>
        <input type="text" placeholder={props.input.placeholder} pattern={props.input.pattern} required={props.input.isReq}/>
    </div>
  );
}

export default CompareFilter;