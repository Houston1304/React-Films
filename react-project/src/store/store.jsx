import { list } from "../arrays/filmArray";
import { combineReducers, createStore } from "redux";
import { useEffect } from "react";

export const initialState = list.slice(0, 6);

const ADD_FILM = "ADD_FILM";
const ADD_COUNT = "ADD_COUNT";
const SWITCH_FILTER = "SWITCH_FILTER";
const SWITCH_YEAR = "SWITCH_YEAR";
const SWITCH_GENRE = "SWITCH_GENRE";
const TOGGLE_POPUP = "TOGGLE_POPUP";

export function addNewFilm(film) {
  return {
    type: ADD_FILM,
    film,
  };
}

export function addCount(count) {
  return {
    type: ADD_COUNT,
    count,
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

function addFilmArray(state = initialState, action) {
  if (action.type === ADD_FILM) {
    const newState = [...state];
    newState.push(action.film);
    return newState;
  }

  return state;
}

function currentCount(state = 1, action) {
  switch (action.type) {
    case ADD_COUNT:
      return action.count;
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

function currentToggle(state = false, action) {
  switch (action.type) {
    case TOGGLE_POPUP:
      return action.toggle;
    default:
      return state;
  }
}

const filmAction = combineReducers({
  addFilmArray,
  currentCount,
  currentFilter,
  currentYear,
  currentGenre,
  currentToggle,
});

export const store = createStore(filmAction);
