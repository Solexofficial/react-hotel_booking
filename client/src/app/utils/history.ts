import { createBrowserHistory, Location } from 'history';

type LocationState = {
  from: Location;
};

const history = createBrowserHistory<LocationState>();

export default history;
