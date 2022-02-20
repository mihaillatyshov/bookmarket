import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BookConnector, { BookProps } from './BookConnector';
import s from './Book.module.css';

const Book = (props: BookProps) => {
	const { id } = useParams()
	if (id === undefined || id > props.booksCount || typeof props.booksCount != 'number') {
		return (
			<div>

			</div>
		)
	}
	const book = props.books[parseInt(id)].volumeInfo

	return (
		<div className="container">
			<div className="row py-5">
			<Link to="/"><button className="btn btn-lg btn-info"> Back </button></Link>
				<div className='col-auto mt-5'>
					{
						<img
							className={s.img}
							src={
								book.imageLinks === undefined ? (
									"https://books.google.ru/googlebooks/images/no_cover_thumb.gif"
								) : (
									book.imageLinks.smallThumbnail
								)
							}
							alt="..."
						/>
					}
				</div>
				<div className={`col mt-5 ${s.content}`}>
					<h2 className="card-title"> { book.title } </h2>
					<p><small className="text-muted"> { book.categories && book.categories.join(" / ") } </small></p>
					<p> { book.authors && book.authors.join(", ") } </p>
					<p> { book.description && book.description }</p>
				</div>
			</div>
		</div>
	)
}

export default BookConnector(Book)