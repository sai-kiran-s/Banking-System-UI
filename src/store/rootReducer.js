import {combineReducers} from 'redux'
import { customerReducer } from './customerReducer'
import { profileReducer } from './profileReducer'
import { transactionReducer } from './transactionReducer'

export const rootReducer = combineReducers({
  customer:customerReducer,
  transaction:transactionReducer,
  profile:profileReducer
})