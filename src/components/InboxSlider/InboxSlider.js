import React from 'react'
import axios from 'axios'
import Slider from "react-slick";
import Slide from './Slide/Slide'

import './slick.css'
import styles from './InboxSlider.module.css'

class InboxSlider extends React.Component {
	state = {
		loans: null,
		error: null
	}

	componentDidMount () {
		if(!this.state.loans) {
			axios.get('https://kwara-api.glitch.me/inbox')
				.then(response => {
					this.setState({ loans: response.data.data })
				})
				.catch(error => { this.setState({ error: error.message }) })
		}
	}

	// Action should be different given every entry
	eventActionHandler = (actionType) => {
		console.log(actionType)
	}

	render() {
		let loansToShow = this.state.error ? <h3>{this.state.error}</h3> : <h3>Loading messages...</h3>

		if(this.state.loans) {
			loansToShow = this.state.loans.length === 0 ? <h3>No messages today</h3> :
				<Slider {...this.props.settings}>
					{ this.state.loans.map((loan, i) => (
						<Slide key={i} 
						slideNum={i+1}
						totalSlides={this.state.loans.length}
						date={loan.info.dates.timestamp}
						amount={loan.amount} 
						member={loan.member} 
						actionType={loan.action}
						buttonClicked={this.eventActionHandler} />
					)) }
				</Slider>
		}

		return (
			<div className={styles.InboxSlider}>
				<h2>Inbox</h2>
				<div className={styles.Slides}>
					{loansToShow}
				</div>
			</div>
		)
	}
} 

InboxSlider.defaultProps = {
	settings: {
		arrows: true,
		infinite: false,
		dots: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}
}

export default InboxSlider