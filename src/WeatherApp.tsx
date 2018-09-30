import * as React from 'react';
import Loader from 'react-loader-spinner';
import './WeatherApp.css';

interface IweatherPageProps {
	city: string,
	country: string,
	temperature: string,
	humidity: string,
	wind: string,
	infoStatus: string
  }

class WeatherApp extends React.Component<{}, IweatherPageProps> {
	
	constructor(props: any) {
		super(props);
		this.state = {
			city: "",
			country: "",
			temperature: "",
			humidity: "",
			wind: "",
			infoStatus: "",
		};
	};
	public getWeatherInformation = (city: string) => {
		const main = this;
		let query = null;
		main.setState({
			infoStatus: '0'
		});

		query = city;
		
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=dd04ed7701a7318d749d5a96f922aeee`)
			.then( 
				function(response) {
					return response;
				}
			)
			.then( function(response) {
				setTimeout( 
					function() {
						main.setState({
							infoStatus: '1'
						});
					}
					, 1000
				);
				return response.json();
			}
			)
		.then( function(data) {
			main.setState({
				city: data.name,
				country: data.sys.country,
				temperature: data.main.temp,
				humidity: data.main.humidity,
				wind: data.wind.speed,
			});
		})
		.catch( function() {
			main.setState({
				infoStatus: '-1'
			});
		})
	};
	public handle = (event: any) => {
		event.preventDefault();
		this.getWeatherInformation(event.target.search.value);
	};
	public render() {
		const { city,
				country,
				temperature, 
				humidity, 
				wind, 
				infoStatus } = this.state;
		let data = null;
		if (infoStatus === '1') {
			data = 	<div className="weatherInformation">
						<div className="cityName">
							<div>{city} <span>({country})</span></div>
							</div>
							<div className="temperature">
							<div>Temperature:<span>{temperature}°C</span></div>
							<div>Humidity:<span>{humidity}%</span></div>
							<div>Wind:<span>{wind}m/s</span></div>
						</div>
					</div>
		} else if (infoStatus === '0') {
				data = <div className="state"> <Loader type="Watch" color="black" height={100} width={100}/></div>
		} else if (infoStatus === '-1') {
			data = <div className="state">Error. Please Try again.</div>
		}	
		return (
			<div className="weatherApp">
				<div className="weatherQuery">
					<form onSubmit={this.handle}>
						<input 
							type="text" 
							name="search"
							placeholder="Please input a city..."
						/>
					</form>
				</div>
				{data}
			</div>
		);
	};
}
export default WeatherApp;