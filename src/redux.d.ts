import { ThunkAction as ReduxThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk';

declare module 'redux' {
  export interface Action<T = any> {
    payload?: T;
  }
}

export type ThunkAction<R, S, E = undefined> = ReduxThunkAction<R, S, E, Action<string>>;
export type ThunkDispatch<S, E = undefined> = ReduxThunkDispatch<S, Action<string>, E>;
