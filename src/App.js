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
				<Route exact path='/user/:authorId/post' render={() => <h2>User's Posts</h2>} />
				<Route exact path='/tag/:tagTitle/post' render={() => <h2>Tag's Posts</h2>} />
				<Redirect from='/' to='/posts' />
			</Switch>
		</Layout>
	);
}

export default App;
