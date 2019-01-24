import React from 'react'
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp'

import styles from './Slide.module.css'


const slide = props => (
	<div className={styles.Slide}>
		<div className={styles.Pager}>{props.slideNum} of {props.totalSlides}</div>
		<div className={styles.Date}><Timestamp time={props.date} /></div>
		<div className={styles.Message}>
			{props.member} applied for a loan with a total amount of KES {props.amount}
		</div>
		<button onClick={() => props.buttonClicked(props.actionType)}>Review Loan</button>
	</div>
)

slide.propTypes = {
	date: PropTypes.string.isRequired,
	member: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	actionType: PropTypes.string.isRequired,
	buttonClicked: PropTypes.func.isRequired,
	slideNum: PropTypes.number.isRequired,
	totalSlides: PropTypes.number.isRequired
}


export default slide