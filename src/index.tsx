import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WeatherApp from './WeatherApp';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
