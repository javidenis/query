import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SingleQuestion from './components/singleQuestionDisplay/questions';
import { authenticate } from './store/session';
import { getQuestionsThunk } from './store/questions'
import { getAnswersThunk } from './store/answers'
import { getAllUsersThunk } from "./store/users";
import CreateQuestion from './components/createQuestion/createQuestion';
import EditQuestion from './components/editQuestion/editQuestion';
import Home from './components/home/home';
import LandingPage from './components/landingPage/landingPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getQuestionsThunk())
      await dispatch(getAnswersThunk())
      await dispatch(getAllUsersThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser?.username && <NavBar />}
      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <ProtectedRoute path='/questions' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/questions/new" exact={true}>
          <CreateQuestion />
        </ProtectedRoute>
        <ProtectedRoute exact path="/questions/:id">
          <SingleQuestion />
          </ProtectedRoute>
        <ProtectedRoute exact path="/questions/:id/edit">
          <EditQuestion />
        </ProtectedRoute>
        <ProtectedRoute>
          <h1 id='notfound'>Page Not Found</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
