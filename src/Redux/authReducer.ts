import api, {loginApi} from "../api/api";
import {RootThunkType} from "./store";

export type initStateType = {
    data: {
        id: number | null,
        login: string,
        email: string
    },
    messages: string[],
    fieldsErrors: null,
    resultCode: number | null,
    isAuth: boolean
}

const initialState: initStateType = {
    data: {
        id: null,
        login: '',
        email: ''
    },
    messages: [''],
    fieldsErrors: null,
    resultCode: null,
    isAuth: false
}

const authReducer = (state: initStateType = initialState, action: CombinerAuthActionsType): initStateType => {

    switch (action.type) {
        case "USER-AUTH" : {
            console.log(action.data.login)
            return {
                ...state, data: {...state.data, ...action.data}
                , isAuth: true
            }
        }
        default:
            return state
    }

    return state
}

export default authReducer

export const SetUserAuth = (id: number, login: string, email: string) => {
    return {
        type: 'USER-AUTH',
        data: {id, login, email}
    } as const
}

export const LogoutAC = () => {
    return {type:'LOG-OUT', id: null, login: '', email: ''}as const
}
// --------------------thunks------------------------

export const AuthThunkCreator = (): RootThunkType => {
    return (dispatch) => {
        loginApi.auth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(SetUserAuth(id, login, email))
                }
            })
    }
}

export const LoginThunkCreator = (email: string, password: string, rememberMe: boolean): RootThunkType => (dispatch) => {
    loginApi.login(email, password, rememberMe)
        .then(res =>
            (console.log(res)))
            dispatch(AuthThunkCreator())

}

export const LogOutThunkCreator = ():RootThunkType => (dispatch) => {
    loginApi.logout()
        .then(response=>{
             dispatch(LogoutAC)
        })
}


export type CombinerAuthActionsType = UserAuthType
export type UserAuthType = ReturnType<typeof SetUserAuth>