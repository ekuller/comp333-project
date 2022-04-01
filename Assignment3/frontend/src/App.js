import logo from "./logo.svg";
import "./App.css";

// fetch("is-authenticated")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		this.setState({ spotifyAuthenticated: data.status });
// 		console.log(data.status);
// 		if (!data.status) {
// 			fetch("get-auth-url")
// 				.then((response) => response.json())
// 				.then((data) => {
// 					window.location.replace(data.url);
// 				});
// 		}
// 	});

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
