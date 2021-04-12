import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewCustomers from './pages/viewcustomers';
import Profile from './pages/profile';
import ViewCustomerExcept from './pages/viewcustomerexcept';
import Transfer from './pages/transfer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/viewcustomers">
            <ViewCustomers />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/viewspecifictransactions">
            <ViewCustomerExcept/>
          </Route>
          <Route path="/transfer">
            <Transfer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
