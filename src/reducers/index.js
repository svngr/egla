import { combineReducers } from 'redux';
import { AppNavigator } from '../AppNavigator';
import { NavigationActions } from 'react-navigation';

const firstAction = AppNavigator.router.getActionForPathAndParams('App');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  return state;
}

const initialSettingsState = { fullscreen: false, language: "is", readingFontSize: 20 };

function settings(state = initialSettingsState, action) {
  switch (action.type) {
    case 'TOGGLE_FULLSCREEN':
      return { ...state, fullscreen: !state.fullscreen };
    case 'STOP_FULLSCREEN':
      return { ...state, fullscreen: false };
    case 'CHANGE_LANGUAGE':
      return { ...state, language: action.value };
    case 'CHANGE_FONT_SIZE':
      var newFontSize = state.readingFontSize;

      // six different font sizes possible
      if (newFontSize < 29)
        newFontSize = newFontSize + 3;
      else
        newFontSize = 14

      return { ...state, readingFontSize: newFontSize };
    default:
      return state;
  }
}

// example: if chaptersReadList is [1,2], then chapter 1 and chapter 2 have been read
const initialChaptersState = { chaptersReadList: [], selectedChapter: 1 };

function chapters(state = initialChaptersState, action) {
  const { chaptersReadList } = state;

  switch (action.type) {
    case 'CHANGE_SELECTED_CHAPTER':
      return { ...state, selectedChapter: action.value };
    case 'TOGGLE_CHAPTER_READ':
      var currChapter = action.value;
      const newItems = [];

      if (chaptersReadList !== undefined) {
        newItems = chaptersReadList.slice(); // copy

        if (newItems.indexOf(currChapter) < 0)
          newItems.push(currChapter); // add currChapter (i.e. mark as read)
        else
          newItems = chaptersReadList.filter(e => e !== currChapter); // remove currChapter (i.e. mark as unread)
      }

      return { ...state, chaptersReadList: newItems };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  settings,
  chapters,
});

export default AppReducer;
