
import React from 'react'
import { ServerAPI_GET } from '../../lib/ServerAPI';
import SearchConnector, { SearchProps } from './SearchConnector';
import s from './Search.module.css';

const Search = (props: SearchProps) => {
	const search = () => {
		props.setLoading();
		ServerAPI_GET({
			url: "https://www.googleapis.com/books/v1/volumes",
			urlParams: {
				q: props.label + (props.viewCategory[props.category] === "all" ? "" : `+subject:${props.viewCategory[props.category]}`),
				startIndex: 0,
				maxResults: props.pageSize,
				orderBy: props.viewSort[props.sort]
			},
			onDataReceived: (data) => {
				console.log(data)
				props.setBooks({ totalItems: data.totalItems, items: data.items === undefined ? [] : data.items })
			}
		});
	}

	const handleChangeLabel = (e : React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		props.setLabel(e.target.value)
	}

	const handleChangeCategory = (e : React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value)
		props.setCategory(e.target.value)
	}

	const handleChangeSort = (e : React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value)
		props.setSort(e.target.value)
	}

	return (
		<div className={`container-fluid ${s.box}`}>
			<div> Search </div>
			<div className={`row justify-content-md-center ${s.search}`}>
					<input className={`form-control form-control-lg col ${s.input}`} type="text" value={props.label} onChange={handleChangeLabel}  />
					<div className="col-auto">
						<button onClick={search} className="btn btn-lg btn-danger"> Search </button>
					</div>
			</div>
			<div className="row justify-content-md-center">
				<div className="col">
					<select className={`form-select mx-auto mt-4 ${s.select}`} value={props.category} onChange={handleChangeCategory} >
						{
							props.viewCategory.map((category, i) => {
								return (
									<option key={i} value={i}> { category } </option>
								)
							})
						}
					</select>
				</div>
				<div className="col">
					<select className={`form-select mx-auto mt-4 ${s.select}`} value={props.sort} onChange={handleChangeSort} >
						{
							props.viewSort.map((sort, i) => {
								return (
									<option key={i} value={i}> { sort } </option>
								)
							})
						}
					</select>
				</div>
			</div>
		</div>
	)

}

export default SearchConnector(Search)
