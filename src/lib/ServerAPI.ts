
interface HandleStatusData {
	isOk: boolean;
	status: number;
	data: any | undefined;
}


interface AnyServerAPIParams {
	url: string;
	urlParams?: Object | undefined;
	sendObj?: BodyInit | undefined;
	onDataReceived?: (data: any) => void | undefined;
	handleStatus?: ((data: HandleStatusData) => void) | undefined;
	headers?: HeadersInit | undefined;
}

const DefaultServerAPIParams : AnyServerAPIParams = {
	url: "/",
	urlParams: undefined,
	sendObj: undefined,
	onDataReceived: undefined,
	handleStatus: undefined,
	headers: undefined
}

interface ServerAPIParams extends AnyServerAPIParams {
	method: string
}

const getStrFromParams = (rawParams: Object | undefined) => {
	return rawParams ? ('?' + Object.entries(rawParams).map((item) => { return `${item[0]}=${item[1]}` }).join('&')) : ""
}

const ServerAPI = (params: ServerAPIParams) => {
	console.log(params.url + getStrFromParams(params.urlParams))
	fetch(params.url + getStrFromParams(params.urlParams), {
		method: params.method,
		headers: params.headers,
		body: params.sendObj
	}).then(responce => {
		const promise = responce.json()
		promise.then((data) => {
			params.handleStatus && params.handleStatus({ isOk: responce.ok, status: responce.status, data: data })
			if (responce.ok) {
				params.onDataReceived && params.onDataReceived(data)
			}
		}).catch((err) => {
			params.handleStatus && params.handleStatus({ isOk: responce.ok, status: responce.status, data: undefined })
			console.log(err);
		})
	})
}

export const ServerAPI_GET = (params = DefaultServerAPIParams) => {
	ServerAPI({ ...params, method: 'GET' })
}

export const ServerAPI_POST = (params = DefaultServerAPIParams) => {
	ServerAPI({ ...params, method: 'POST' })
}

export const ServerAPI_PATCH = (params = DefaultServerAPIParams) => {
	ServerAPI({ ...params, method: 'PATCH' })
}

export const ServerAPI_DELETE = (params = DefaultServerAPIParams) => {
	ServerAPI({ ...params, method: 'DELETE' })
}
