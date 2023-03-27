export function buildRouteUrl(path) {
  const routeParametersRegex = /:([a-zA-Z0-9]+)/g;
  const routeWithParameters = path.replace(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  );
  const queryRegex = '(?<query>\\?(.*))?$';

  const pathRegex = new RegExp(`^${routeWithParameters}${queryRegex}`);
  return pathRegex;
}
