import '../index.css';

function InputFile({props}) {
  return (
    <div className={"input-block " + props.blockClass}>
        <p className="input-title">{props.title}</p>
        <input type="file" id={props.id} multiple={props.isMult} accept={props.accept}/>
    </div>
  );
}

export default InputFile;