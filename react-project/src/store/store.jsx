import { list } from "../arrays/filmArray";
import { combineReducers, createStore } from "redux";
import { useEffect } from "react";

export const initialState = list.slice(0, 6);

const ADD_FILM = "ADD_FILM";

const SWITCH_FILTER = "SWITCH_FILTER";
const SWITCH_YEAR = "SWITCH_YEAR";
const SWITCH_GENRE = "SWITCH_GENRE";
const TOGGLE_POPUP = "TOGGLE_POPUP";
const CURRENT_PAGE = "PAGE_FORWARD";
const SWITCH_GRADE = "SWITCH_GRADE";
const SWITCH_POPULARITY = "SWITCH_POPULARITY";

export function addNewFilm(film) {
  return {
    type: ADD_FILM,
    payload: film,
  };
}

export function switchFilter(filter) {
  return {
    type: SWITCH_FILTER,
    filter,
  };
}

export function switchYear(year) {
  return {
    type: SWITCH_YEAR,
    year,
  };
}

export function switchGenre(genre) {
  return {
    type: SWITCH_GENRE,
    genre,
  };
}

export function togglePopUp(toggle) {
  return {
    type: TOGGLE_POPUP,
    toggle,
  };
}

export function switchGrade(grade) {
  return {
    type: SWITCH_GRADE,
    grade,
  };
}

export function switchPopularity(popularity) {
  return {
    type: SWITCH_POPULARITY,
    popularity,
  };
}

export const chengeNumberPage = (text) => {
  return { type: CURRENT_PAGE, payload: text };
};

function addFilmArray(state = list.slice(0, 6), action) {
  switch (action.type) {
    case ADD_FILM:
      return { ...state, film: action.payload };

    default:
      return state;
  }
}

function currentFilter(state = "", action) {
  switch (action.type) {
    case SWITCH_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function currentYear(state = "", action) {
  switch (action.type) {
    case SWITCH_YEAR:
      return action.year;
    default:
      return state;
  }
}

function currentGenre(state = "", action) {
  switch (action.type) {
    case SWITCH_GENRE:
      return action.genre;
    default:
      return state;
  }
}

function currentGrade(state = "", action) {
  switch (action.type) {
    case SWITCH_GRADE:
      return action.grade;
    default:
      return state;
  }
}

function currentPopularity(state = "", action) {
  switch (action.type) {
    case SWITCH_POPULARITY:
      return action.popularity;
    default:
      return state;
  }
}

function currentToggle(state = false, action) {
  switch (action.type) {
    case TOGGLE_POPUP:
      return action.toggle;
    default:
      return state;
  }
}

const defaultState = {
  currentPage: 1,
};

const pageSwitch = (state = defaultState, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

const filmAction = combineReducers({
  addFilmArray,
  currentFilter,
  currentYear,
  currentGenre,
  currentToggle,
  pageSwitch,
  currentGrade,
  currentPopularity,
});

export const store = createStore(filmAction);
