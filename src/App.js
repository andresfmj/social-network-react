import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Feed from './container/Feed/Feed';


function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/posts' component={Feed} />
				<Redirect from='/' to='/posts' />
			</Switch>
		</Layout>
	);
}

export default App;
