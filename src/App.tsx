import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from './components/Books/Books';
import Book from './components/Books/Book';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Books />} />
					<Route path="/book/:id" element={<Book />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
