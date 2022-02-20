import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";

const mapStateToProps = (state: RootState) => {
	return {
		books: state.books.items,
		booksCount: state.books.totalItems,
	}
}

const BookConnector = connect(mapStateToProps);

export type BookProps = ConnectedProps<typeof BookConnector>

export default BookConnector;
