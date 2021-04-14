import {combineReducers} from 'redux'
import { alertReducer } from './alertReducer'
import { customerReducer } from './customerReducer'
import { profileReducer } from './profileReducer'
import { transactionReducer } from './transactionReducer'
import { transferReducer } from './transferReducer'

export const rootReducer = combineReducers({
  customer:customerReducer,
  transaction:transactionReducer,
  profile:profileReducer,
  transfer:transferReducer,
  alert:alertReducer
})