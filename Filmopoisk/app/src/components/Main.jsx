import '../index.css';
import Filters from './Filters';
import Sorts from './Sorts';
import { Link } from "react-router-dom"; 
import Card from './Card';
import RangeFilter from './RangeFilter';
import SelectionFilter from './SelectionFilter';
import CompareFilter from './CompareFilter';
import { useState } from 'react';
import Warning from './Warning';
import CardsContext from './CardsContext';
import Button from './Button';
import Sort from './Sort';
import RemoveContext from './RemoveContext';
import SortContext from './SortContext';
import OptionContext from './OptionContext';

function Main() {

  let films = JSON.parse(localStorage.getItem("REACT"));
  if (!films) films = [];

  const [currList, setCurrList] = useState([...films]);
  const [isWarn, setIsWarn] = useState(false);
  const [removeable, setRemoveable] = useState(-1);
  
  let range1 = {
    id: "date-filter",
    title: "Год выпуска:",
    startTitle: "с",
    endTitle: "по",
    minStart: 1900,
    minEnd: 1900,
    maxStart: 2100,
    maxEnd: 2100,
    measure: "год",
  };

  let range2 = {
      id: "duration-filter",
      title: "Продолжительность:",
      startTitle: "от",
      endTitle: "до",
      minStart: 1,
      minEnd: 1,
      maxStart: 240,
      maxEnd: 240,
      measure: "мин.",
  };

  let selection1 = {
      id: "age-filter",
      title: "Возрастной рейтинг",
      select: {
          isReq: false,
          options: [
              {value: "-1", innerHtml: "Любой"},
              {value: "0", innerHtml: "0+"},
              {value: "6", innerHtml: "6+"},
              {value: "12", innerHtml: "12+"},
              {value: "16", innerHtml: "16+"},
              {value: "18", innerHtml: "18+"},
          ]
      },
  };

  let compare1 = {
      title: "Язык",
      id: "language-filter",
      input: {
          placeholder:"Русский",
          pattern: "[a-zA-Zа-яА-ЯёЁ]{3,20}",
          isReq: false,
      },
  };

  let filter = {
    invoke: (event) => {

      event.preventDefault();

      let dateS = Number(document.querySelectorAll("#date-filter input")[0].value);
      let dateE = Number(document.querySelectorAll("#date-filter input")[1].value);
      let durationS = Number(document.querySelectorAll("#duration-filter input")[0].value);
      let durationE = Number(document.querySelectorAll("#duration-filter input")[1].value);
      let age = Number(document.querySelector("#age-filter select").value);
      let language = (document.querySelector("#language-filter input").value);

      console.log(dateS, dateE, durationS, durationE, age, language);
      if (dateE === 0) dateE = range1.maxEnd;
      if (durationE === 0) durationE = range2.maxEnd;

      let currListTmp = [].concat(films);
      
      if (dateS)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i].date < dateS || currListTmp[i].date > dateE)
            currListTmp[i] = null;
        }

      if (durationS)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && (currListTmp[i].duration < durationS || currListTmp[i].duration > durationE))
            currListTmp[i] = null;
        }
      
      if (age !== -1)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && currListTmp[i].age !== age)
            currListTmp[i] = null;
        }
      
      if (language)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && currListTmp[i].language !== language)
            currListTmp[i] = null;
        }

      setCurrList(currListTmp.filter((elem) => elem != null))
    },
    arr: [
      <RangeFilter props={range1} key="date-filter"/>,
      <RangeFilter props={range2} key="duration-filter"/>,
      <SelectionFilter props={selection1} key="age-filter"/>,
      <CompareFilter props={compare1} key="language-filter"/>,
    ]
  };

  const compareAgeUp = (a, b) => {
    if (a.age == null && b.age != null) return 1;
    if (a.age != null && b.age == null) return -1;
    if (a.age > b.age) return 1;
    if (a.age < b.age) return -1;
    return 0;
  }

  const compareYearUp = (a, b) => {
      if (a.date == null && b.date != null) return 1;
      if (a.date != null && b.date == null) return -1;
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
  }

  const compareDurationUp = (a, b) => {
      if (a.duration == null && b.duration != null) return 1;
      if (a.duration != null && b.duration == null) return -1;
      if (a.duration > b.duration) return 1;
      if (a.duration < b.duration) return -1;
      return 0;
  }

  const compareAgeDown = (a, b) => {
    if (a.age == null && b.age != null) return 1;
    if (a.age != null && b.age == null) return -1;
    if (a.age > b.age) return -1;
    if (a.age < b.age) return 1;
    return 0;
  }

  const compareYearDown = (a, b) => {
      if (a.date == null && b.date != null) return 1;
      if (a.date != null && b.date == null) return -1;
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
  }

  const compareDurationDown = (a, b) => {
      if (a.duration == null && b.duration != null) return 1;
      if (a.duration != null && b.duration == null) return -1;
      if (a.duration > b.duration) return -1;
      if (a.duration < b.duration) return 1;
      return 0;
  }
  const compare = (comparator) => {
    let copy = JSON.parse(localStorage.getItem("REACT"));
    copy.sort(comparator);
    setCurrList(copy);
  }

  let sort = {arr: [
    <SortContext.Provider key="year-sort" value={{up: () => compare(compareYearUp), down: () => compare(compareYearDown)}}>
      <Sort props={{class: "year-sort", title: "Год выпуска:"}}/>
    </SortContext.Provider>,

    <SortContext.Provider key="time-sort" value={{up: () => compare(compareDurationUp), down: () => compare(compareDurationDown)}}>
      <Sort props={{class: "time-sort", title: "Продолжительность:"}}/>
    </SortContext.Provider>,

    <SortContext.Provider key="age-sort" value={{up: () => compare(compareAgeUp), down: () => compare(compareAgeDown)}}>
      <Sort props={{class: "age-sort", title: "Возрастной рейтинг:"}}/>
    </SortContext.Provider>,
  ]};
  
  const remove = (i) => {
    setIsWarn(true);
    setRemoveable(i);
  }

  const yesF = () => {
    let newFilms = currList.slice(0,removeable).concat(currList.slice(removeable+1, currList.length));
    localStorage.setItem("REACT", JSON.stringify(newFilms))
    setCurrList(newFilms);
    noF();
  }

  const noF = () => {
    setIsWarn(false);
    setRemoveable(-1);
  }

  const randomFilms = () => {
    console.log("Waiting for data");
    const url = "https://api.kinopoisk.dev/v1.3/movie/random";

    fetch(url, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": "YW6TWW9-X4AM2MH-HR4R7JA-JQJ9XX5",
      },
    })
      .then((response) => response.json())
      .then((result) => {

        let films = JSON.parse(localStorage.getItem("REACT"));
        let id = JSON.parse(localStorage.getItem("REACTID"));
        if (films == null) films = [];
        if (id == null) id = 0;

        id++;
        console.log(result);
        let ans = {
          id: id,
          title: result.name,
          date: result.year,
          duration: result.movieLength,
          age: result.ageRating,
          type: "",
          country: "",
          language: "",
          author: "",
          actor: "",
          poster: result.poster.url,
          review: null,
          r8: null,
          status: 0,
        }
        
        let types = 0;
        let countries = 0;
        let languages = 0;
        let authors = 0;
        let actors = 0;

        for (let  i = 0; types < 3 && i < result.genres.length; i++) {
          ans.type += result.genres[i].name + ", ";
          types++;
        }
        
        for (let  i = 0; countries < 3 && i < result.countries.length; i++) {
          ans.country += result.countries[i].name + ", ";
          countries++;
        }

        for (let  i = 0; languages < 3 && i < result.spokenLanguages.length; i++) {
          ans.language += result.spokenLanguages[i].name + ", ";
          languages++;
        }

        for (let i = 0; i < result.persons.length && (authors < 3 || actors < 3); i++){
          if (result.persons[i].profession === "режиссеры" && authors < 3) {
            ans.author += result.persons[i].name + ", ";
            authors++;
          }
          else if (result.persons[i].profession === "актеры" && actors < 3) {
            ans.actor += result.persons[i].name + ", ";
            actors++;
          }
        }

        if (ans.type) ans.type = ans.type.substring(0, ans.type.length - 2);
        if (ans.country) ans.country = ans.country.substring(0, ans.country.length - 2);
        if (ans.language) ans.language = ans.language.substring(0, ans.language.length - 2);
        if (ans.author) ans.author = ans.author.substring(0, ans.author.length - 2);
        if (ans.actor) ans.actor = ans.actor.substring(0, ans.actor.length - 2);

        films.push(ans);
        
        setCurrList(films);
        localStorage.setItem("REACT", JSON.stringify(films));
        localStorage.setItem("REACTID", JSON.stringify(id));
      });
  }

  return (
    <main className="films">

        {isWarn ? 
        <OptionContext.Provider value={{yes: yesF, no: noF}}>
          <Warning/>
        </OptionContext.Provider>
         : ""
        }

        <div className="tools">  
            <Filters props={filter}/>
            <Sorts props={sort}/>
        </div>

        <article className="films-header">
            <h1 className="c m">Ваши фильмы</h1>
            <Link to="/form" className="add-film c m"><p className="add-film-inner">Cвой фильм</p></Link>
            <Button props={{type: "button", classOut: "add-rand-film c", classIn: "add-rand-film-inner", innerHtml: "Cлучайный фильм", onClick: () => {randomFilms()}}}/>
        </article>

        <div className="cards">
          <CardsContext.Provider value={[currList, setCurrList]}>
          {
            currList == null ? "" :
            currList.map((e,i) => 
              <RemoveContext.Provider key={i} value={() => remove(i)}>
                <Card ans={e}/>
              </RemoveContext.Provider>
            )
          }
          </CardsContext.Provider>
        </div>

    </main>
  );
}

export default Main;