import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InputField from './Components/InputField';
import Start from './Pages/Start';
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom';
import VideoPlayer from './Components/VideoPlayer';

function App(props) {
  return (
      <Router>
        <Switch>

          <Route exact path="/">
            <Start />
          </Route>

          <Route path="/create">
            <CreateRoom />
          </Route>

          <Route path="/join">
            <JoinRoom />
          </Route>

        </Switch>
      </Router>

  );
}

export default App;