import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setBooks, setCategory, setLabel, setLoading, setSort } from "../../features/books/booksSlice";

const mapStateToProps = (state: RootState) => {
	return {
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
		setBooks: bindActionCreators(setBooks, dispatch),
		setLabel: bindActionCreators(setLabel, dispatch),
		setCategory: bindActionCreators(setCategory, dispatch),
		setSort: bindActionCreators(setSort, dispatch),
		setLoading: bindActionCreators(setLoading, dispatch)
	}
}

const SearchConnector = connect(mapStateToProps, mapDispatchToProps);

export type SearchProps = ConnectedProps<typeof SearchConnector>

export default SearchConnector;
