import { limitSettings } from '../../config/config';

function buildUrl(req, limit, nextOffset, count, filter) {
  // check if there is actually a next/previous page of results
  if (nextOffset < 0) return null;
  if (nextOffset >= count) return null;
  // build the URL
  const lastPart = req.originalUrl.split('?')[0];
  const queryParams = req.query;
  let url = `${req.protocol}://${req.get('host')}${lastPart}?`;
  Object.keys(queryParams).forEach((key) => {
    if (key !== 'offset' && key !== 'limit' && key !== 'filter') {
      const value = encodeURIComponent(queryParams[key]);
      url = `${url}${key}=${value}&`;
    }
  });
  url = `${url}limit=${limit}&offset=${nextOffset}`;
  if (filter) {
    url = `${url}&filter=${filter}`;
  }
  return url;
}

export default class ResponseList {
  constructor(req, queryResult, filter = null) {
    this.meta = {
      url: req.baseUrl,
      query: req.query,
      params: req.params,
      time: new Date().valueOf(),
      count: queryResult.count,
    };
    this.data = queryResult.rows;

    // const until = Number(req.query.until) || new Date().valueOf();
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || limitSettings.invoice.get;

    // if (validPagination(offset, until, limit)) {
    this.cursor = {
      // until,
      offset,
      limit,
      next: buildUrl(req, limit, offset + limit, this.meta.count, filter),
      previous: buildUrl(req, limit, offset - limit, this.meta.count, filter),
    };
  }

  value() {
    const response = Object.create(null);

    if (this.meta) response.meta = this.meta;
    if (this.cursor) response.cursor = this.cursor;
    if (this.err) response.err = this.err;
    if (this.data) response.data = this.data;


    return response;
  }
}
