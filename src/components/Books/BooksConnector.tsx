import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { addBooks } from "../../features/books/booksSlice";

const mapStateToProps = (state: RootState) => {
	return {
		books: state.books.items,
		booksCount: state.books.totalItems,
		label: state.books.label,
		viewCategory: state.books.viewCategory,
		category: state.books.category,
		viewSort: state.books.viewSort,
		sort: state.books.sort,
		pageSize: state.books.pageSize
	}
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		addBooks: bindActionCreators(addBooks, dispatch),
	}
}

const BooksConnector = connect(mapStateToProps, mapDispatchToProps);

export type BooksProps = ConnectedProps<typeof BooksConnector>

export default BooksConnector;
