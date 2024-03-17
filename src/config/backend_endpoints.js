export const API_BASE_URL = "https://zainchaudhary.pythonanywhere.com/";

export const SIGN_UP_END_POINT = API_BASE_URL + "postauthuser/";
export const LOGIN_END_POINT = API_BASE_URL + "token/";
export const UPDATE_USER_PROFILE = API_BASE_URL + "updateprofile/";
export const UPDATE_USER_Password = API_BASE_URL + "updatepassword/";

export const UPDATE_NOTIFICATION = API_BASE_URL + "postnotification/";

export const ADD_CHILD = API_BASE_URL + "postchildrens/";
export const UPDATE_CHILD = API_BASE_URL + "updatechilddetail/";
export const GET_ALL_CHILDERN = API_BASE_URL + "childrens/";
export const DELETE_CHILDREN = API_BASE_URL + "deletechild/";
export const GET_CHILD_GOAL = API_BASE_URL + "getchildgoal/{child_id}";
export const UPLOAD_CHILD_GOAL = API_BASE_URL + "goalsettings/";

export const GET_ALL_COLORS = API_BASE_URL + "getcolors/";
export const GET_ALL_TIERS = API_BASE_URL + "gettier/";

export const SAVE_NEW_SUBJECT = API_BASE_URL + "postsubject/";
export const UPDATE_SUBJECT = API_BASE_URL + "updatesubject/";
export const DELETE_SUBJECT = API_BASE_URL + "deletesubject/";
export const GET_ALL_SUBJECTS = API_BASE_URL + "getactivesubjects/";
export const GET_ALL_SUBJECTS_WITH_COURSES =
  API_BASE_URL + "subjectwithcourses/";

export const SAVE_SUB_SUBJECT = API_BASE_URL + "postcourse/";
export const UPDATE_SUB_SUBJECT = API_BASE_URL + "updatecourse/";
export const DELETE_SUB_SUBJECT = API_BASE_URL + "deletecourse/";
export const GET_SUB_SUBJECTS_BY_SUBJECT =
  API_BASE_URL + "getactivecoursesbysubject/";

export const SUBJECT_DEFAULT_PROMPT = {
  SAVE: API_BASE_URL + "defaultprompt/",
  GET: API_BASE_URL + "getdefaultprompt/",
};

export const SAVE_NEW_QUIZ = API_BASE_URL + "postquizez/";
export const UPDATE_QUIZ = API_BASE_URL + "updatequiz/";
export const DELETE_QUIZ = API_BASE_URL + "deletequiz/";
export const GET_ALL_QUIZ = API_BASE_URL + "getquizez/";

// export const SAVE_NEW_ROLE_PLAYING_TOPIC = API_BASE_URL + 'postroleplay/';

export const ROLE_PLAYING_TOPIC = {
  SAVE: API_BASE_URL + "postroleplay/",
  UPDATE: API_BASE_URL + "updateroleplay/",
  DELETE: API_BASE_URL + "deleteroleplay/",
  GET_ALL: API_BASE_URL + "getsubrolewithrole/",
  GET_SUB_TOPICS: API_BASE_URL + "getsubrolebymainrole/",
};

export const ROLE_PLAYING_DEFAULT_PROMPT = {
  SAVE: API_BASE_URL + "postroleplaydefaultprompt/",
  GET: API_BASE_URL + "getallroleplaydefaultprompt/",
};

export const SUB_ROLE_PLAYING_TOPIC = {
  SAVE: API_BASE_URL + "postsubroleplay/",
  UPDATE: API_BASE_URL + "updatesubroleplay/",
  DELETE: API_BASE_URL + "deletesubrole/",
  GET_ALL: "",
};

export const PROMPTS = {
  SAVE: API_BASE_URL + "postadminprompt/",
  UPDATE: API_BASE_URL + "updateadminprompt/",
  DELETE: API_BASE_URL + "deleteadminprompt/",
  GET_ALL: API_BASE_URL + "getalladminprompts/",
};

export const JOURNAL = {
  SAVE: API_BASE_URL + "postjournal/",
  UPDATE: API_BASE_URL + "updatejournal/",
  DELETE: API_BASE_URL + "deletejournal/",
  GET_ALL: API_BASE_URL + "getalljournals/",
};

export const BOT_CHAT = API_BASE_URL + "chat/";

export const PERFORMANCE = API_BASE_URL + "performance/";

export const POST_LEARNING_TIME = API_BASE_URL + "learningtimerecord/";
