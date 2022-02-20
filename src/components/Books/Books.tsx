import React from 'react'
import { ServerAPI_GET } from '../../lib/ServerAPI';
import BooksConnector, { BooksProps } from './BooksConnector';
import s from './Books.module.css';
import BookPreview from './BookPreview';
import { Link } from 'react-router-dom';
import Search from './Search';

const Books = (props: BooksProps) => {
	const handleLoadMore = () => {
		ServerAPI_GET({
			url: "https://www.googleapis.com/books/v1/volumes",
			urlParams: {
				q: props.label + (props.viewCategory[props.category] === "all" ? "" : `+subject:${props.viewCategory[props.category]}`),
				startIndex: props.books.length,
				maxResults: props.pageSize,
				orderBy: props.viewSort[props.sort]
			},
			onDataReceived: (data) => {
				console.log(data)
				props.addBooks({ totalItems: data.totalItems, items: data.items === undefined ? [] : data.items })
			}
		});
	}

	return (
		<div>
			<Search />
			{
				props.booksCount === "loading" ? (
					<div> Loading . . . </div>
				) : (
					props.booksCount === 0 ? (
						<div> No books found </div>
					) : (
						props.booksCount === "start" ? (
							""
						) : (
							<div>
								<div className={s.count}> Книг найдено: {props.booksCount} </div>
								<div className="row mx-0">
									{
										props.books.map((book, i) => {
											return (
												<Link key={i} to={`/book/${i}`} className={`col my-3 ${s.card}`}>
													{book.volumeInfo.categories && console.log(book.volumeInfo.categories.length, i)}
													<BookPreview book={book.volumeInfo} />
												</Link>
											)
										})
									}
								</div>
							</div>
						)))
			}
			{
				props.books.length >= props.booksCount || props.booksCount === "start" || props.booksCount === "loading" ? (
					""
				) : (
					<div>
						{console.log(props.books.length, props.booksCount)}
						<button className="btn btn-lg btn-warning mb-4" onClick={handleLoadMore}> Load more </button>
					</div>
				)
			}
		</div>
	)
}

export default BooksConnector(Books)