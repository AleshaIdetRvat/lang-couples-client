import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"
import { setFetching } from "./LessonReducer"

const SET_LANG_FROM = "SET_LANG_FROM"
const SET_LANG_TO = "SET_LANG_TO"
const userDataStorage = "userData"
const initState = {
    langs: { from: "en", to: "ru" },
}

const UserPersonalDataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LANG_FROM:
            return {
                ...state,
                langs: { ...state.langs, from: action.lang },
            }
        case SET_LANG_TO:
            return {
                ...state,
                langs: { ...state.langs, to: action.lang },
            }
        default:
            return state
    }
}

export const setLangFrom = (lang) => ({
    type: SET_LANG_FROM,
    lang,
})

export const setLangTo = (lang) => ({
    type: SET_LANG_TO,
    lang,
})

export const saveLangs = (langs) => async (dispatch) => {
    dispatch(setFetching(true))
    try {
        await mainAPI.putLangs(langs)
        const userData = JSON.parse(localStorage.getItem(userDataStorage))
        localStorage.setItem(
            userDataStorage,
            JSON.stringify({ ...userData, langs })
        )
    } catch (error) {
        dispatch(newNotice(error.message, "warning"))
    }

    dispatch(setFetching(false))
}

export default UserPersonalDataReducer
