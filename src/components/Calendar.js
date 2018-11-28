import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Calendar, Badge } from 'antd'
import moment from 'moment';
import EventsModal from './CalendarComponents/EventsModal'
import '../css/calendar.css'
import changeCalendarNames from '../utils/changeCalendarNames'
import { getAllEvents, getCategories } from '../redux/reducers/calendarReducer'
import setCalendarEvents from "../utils/setCalendarEvents";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

class CalendarComponent extends Component {
  state = {
    currentYear: null,
    currentMonth: null,
    currentDate: null,
    selectedDate: null,
    showModal: false,
    categories: [],
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const currentUser = JSON.parse(localStorage.getItem('user'));
    changeCalendarNames()
    this.changeDate(moment(Date.now()));
    dispatch(getAllEvents(currentUser.userIdentifier))
    dispatch(getCategories(currentUser.userIdentifier))
  }

  changeDate = value => {
    this.setState({
      currentYear: value.year(),
      currentMonth: value.month() + 1,
      currentDate: value.date(),
      selectedDate: value.format("MM-DD-YYYY"),
    })
  }

  toggleModal = bool => {
    this.setState({ showModal: bool })
  }

  render() {
    const { currentMonth, currentYear, showModal, selectedDate } = this.state
    const { calendar } = this.props;

    const dateCellRender = value => {
      const dateEvents =
        setCalendarEvents(value, calendar.events, currentMonth);
      
        if (dateEvents) {
          return (
            <ul className="events">
              {
                dateEvents.map(event => {
                  let category = calendar.categories.find(category => (
                    category.category_name === event.category
                  ))

                  return (
                    <li key={event.id}>
                      <Badge status={category ? category.color : 'success'} text={event.event_body} />
                    </li>
                  )
                })
              }
            </ul>
          )
        }
    }

    return (
      <div>
        <h1>
          <span>{monthNames[currentMonth - 1]}</span>
          <span>{currentYear}</span>
        </h1>
        <EventsModal
          visible={showModal}
          toggleModal={this.toggleModal}
          selectedDate={selectedDate}
        />
        <Calendar
          dateCellRender={dateCellRender}
          onChange={e => this.changeDate(e)}
          onSelect={e => (this.changeDate(e), this.toggleModal(true))}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({ calendar: state.calendarReducer });

export default connect(mapStateToProps)(CalendarComponent);
