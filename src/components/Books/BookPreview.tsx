import React from 'react'
import s from './Books.module.css';

const BookPreview = ({ book }: any) => {
	return (
		<div className="card">
			<img
				src={
					book.imageLinks === undefined ? (
						"https://books.google.ru/googlebooks/images/no_cover_thumb.gif"
					) : (
						book.imageLinks.smallThumbnail
					)
				}
				className={`mx-auto mt-3 ${s.img}`}
				alt="..."
			/>
			<div className="card-body">
				<h5 className="card-title"> { book.title } </h5>
				<p className="card-text"><small className="text-muted"> { book.categories && book.categories[0] } </small></p>
				<p className="card-text"> { book.authors && book.authors.join(", ") } </p>
			</div>
		</div>
	)
}

export default BookPreview