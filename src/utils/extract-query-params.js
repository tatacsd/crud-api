// ?search=foo&filter=bar
export function extractQueryParams(query) {
  const regexSpace = /%20/g;

  return query
    .substring(1) // remove the ? from the query
    .split('&') // split the query into an array of key=value
    .reduce((queryParam, param) => {
      const [key, value] = param.split('='); // split the key=value into an array
      queryParam[key] = value.replace(regexSpace, ' '); // add the key and value to the object (queryParam)
      return queryParam; // return the object
    }, {}); // the initial value of the reduce is an empty object
}
