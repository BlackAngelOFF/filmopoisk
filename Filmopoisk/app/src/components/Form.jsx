import '../index.css';
import InputBlock from './InputBlock';
import InputFile from './InputFile';
import Select from './Select';
import Button from './Button';

function Form() {

    let title = {
        id: "title-block",
        title: "Название",
        isReq: true,
        isMult: false,
        list: [
            <input type="text" placeholder="Название" pattern="[^<>]{3,30}" required/>
        ],
        temp: null,
    }

    let date = {
        id: "date-block",
        title: "Год выпуска",
        isReq: true,
        isMult: false,
        list: [
            <input type="number" placeholder="2022" min="1900" max="2100" required/>,
        ],
        temp: null,
    }

    let duration = {
        id: "duration-block",
        title: "Продолжительность",
        isReq: true,
        isMult: false,
        list: [
            <input type="number" placeholder="120" min="0" max="240" required/>,
        ],
        temp: null,
    }

    let optionAge = [
        {value: "0", innerHtml: "0+"},
        {value: "6", innerHtml: "6+"},
        {value: "12", innerHtml: "12+"},
        {value: "16", innerHtml: "16+"},
        {value: "18", innerHtml: "18+"},
    ];

    let age = {
        id: "age-block",
        title: "Возрастное ограничение",
        isReq: true,
        isMult: false,
        list: [
            <Select props={{options: [].concat(optionAge), isReq: true}}/>,
        ],
        temp: null,
    }

    let type = {
        id: "type-block",
        title: "Жанр(ы)",
        isReq: true,
        isMult: true,
        list: [
            <input type="text" placeholder="Жанр" pattern="[^0-9]{3,20}" required/>
        ],
        temp: <input type="text" placeholder="Жанр" pattern="[^0-9]{3,20}" required/>
    };

    let country = {
        id: "country-block",
        title: "Cтрана(ы)",
        isReq: true,
        isMult: true,
        list: [
            <input type="text" placeholder="Страна" pattern="[^0-9]{3,20}" required/>
        ],
        temp: <input type="text" placeholder="Страна" pattern="[^0-9]{3,20}" required/>
    };

    let language = {
        id: "language-block",
        title: "Язык(и)",
        isReq: true,
        isMult: true,
        list: [
            <input type="text" placeholder="Язык" pattern="[^0-9]{3,20}" required/>
        ],
        temp: <input type="text" placeholder="Язык" pattern="[^0-9]{3,20}" required/>
    };

    let author = {
        id: "author-block",
        title: "Режиссер(ы)",
        isReq: true,
        isMult: true,
        list: [
            <>
                <input type="text" placeholder="Фамилия" pattern="[^0-9]{3,20}" required/>
                <input type="text" placeholder="Имя" pattern="[^0-9]{3,20}" required/>
            </>,
        ],
        temp: 
        <>
            <input type="text" placeholder="Фамилия" pattern="[^0-9]{3,20}" required/>
            <input type="text" placeholder="Имя" pattern="[^0-9]{3,20}" required/>
        </>
    };

    let actor = {
        id: "actor-block",
        title: "Актер(ы)",
        isReq: true,
        isMult: true,
        list: [
            <>
            <input type="text" placeholder="Фамилия" pattern="[^0-9]{3,20}" required/>
            <input type="text" placeholder="Имя" pattern="[^0-9]{3,20}" required/>
            </>,
        ],
        temp: 
        <>
            <input type="text" placeholder="Фамилия" pattern="[^0-9]{3,20}" required/>
            <input type="text" placeholder="Имя" pattern="[^0-9]{3,20}" required/>
        </>
    };
    
    let file = {
        title: "Постер",
        id: "poster",
        isMult: false,
        accept: "image/png, image/jpeg",
        blockClass: "poster-block"
    };

    const submitHandle = () => {
        
        let key1 = ["#title-block input", "#date-block input", "#duration-block input","#age-block select"];
        let res1 = key1.map((elem) => document.querySelector(elem).value);
                    
        let key2 = ["#type-block input", "#country-block input", "#language-block input", "#author-block input", "#actor-block input"];
        let res2 = key2.map((elem) => [...document.querySelectorAll(elem)].map((k) => k.value));
                    
        let elem = document.querySelector("#poster");
        let res3 = "";

        if (elem.files != null && elem.files.length){
            let file = elem.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                res3 = "data:image/png;base64," + reader.result.replace('data:', '').replace(/^.+,/, '');
                createAnswer(res1, res2, res3);
            }
            reader.readAsDataURL(file);
        }
        else {
            createAnswer(res1, res2, res3);
        }
    }

    const createAnswer = (res1,r,res3) => {

        let res2 = ["","","","",""];

        for (let i = 0; i < 3; i++) 
            for (let j = 0; j < r[i].length; j++)
                res2[i] += r[i][j] + ", ";

        for (let i = 3; i < 5; i++) 
            for (let j = 0; j < r[i].length; j+=2) 
                res2[i] += r[i][j+1] + " "+ r[i][j] + ", ";

        let films = JSON.parse(localStorage.getItem("REACT"));
        let id = JSON.parse(localStorage.getItem("REACTID"));
        if (films == null) films = [];
        if (id == null) id = 0;

        id++;

        let ans = {
            id: id,
            title: res1[0],
            date: res1[1],
            duration: res1[2],
            age: res1[3],
            type: res2[0].substring(0,res2[0].length-2),
            country: res2[1].substring(0,res2[1].length-2),
            language: res2[2].substring(0,res2[2].length-2),
            author: res2[3].substring(0,res2[3].length-2),
            actor: res2[4].substring(0,res2[4].length-2),
            poster: res3,
            review: null,
            r8: null,
            status: 0,
        }

        films.push(ans);
        
        localStorage.setItem("REACT", JSON.stringify(films));
        localStorage.setItem("REACTID", JSON.stringify(id));
    }

    return (
        <main className="form-holder">

            <div className="h2-holder">
                <h2 className="form-title c">Добавление фильма</h2>
            </div>
            
            <form className="add-film-form" onSubmit={submitHandle}>
                <div className="group">
                    <InputBlock props={title}/>
                    <InputBlock props={date} key={"age"}/>
                </div>

                <div className="group">
                    <InputBlock props={duration} key={"date"}/>
                    <InputBlock props={age} key={"duration"}/>
                </div>

                <div className="group">
                    <InputBlock props={type} key={"type"}/>
                    <InputBlock props={country} key={"country"}/>
                    <InputBlock props={language} key={"language"}/>
                </div>

                <div className="group">
                    <InputBlock props={author} key={"author"}/>
                    <InputBlock props={actor} key={"actor"}/>
                </div>
                
                <InputFile props={file}/>
                
                <Button props={{type: "submit", classOut: "submit", classIn: "inner-submit", innerHtml: "Добавить", onClick: null}}/>
            </form>

        </main>
    );
}

export default Form;