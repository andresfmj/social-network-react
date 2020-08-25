import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Feed from './container/Feed/Feed';


function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/posts' component={Feed} />
				<Route path='/post/:id' render={() => <h2>Full Post</h2>} />
				<Route exact path='/tag/:tagTitle/post' component={Feed} />
                <Route exact path='/user/:authorId/post' component={Feed} />
				<Redirect from='/' to='/posts' />
				<Route render={() => <h3>404 Recurso no encontrado</h3>} />
			</Switch>
		</Layout>
	);
}

export default App;
