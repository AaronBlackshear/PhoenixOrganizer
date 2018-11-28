import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import { addEvent } from '../../redux/reducers/calendarReducer';
import { connect } from 'react-redux';
import moment from 'moment';

const { Item } = Form; 
const { Option } = Select; 

class EventForm extends Component {
  state = {
    category: null,
    event: '',
    date: '',
    startTime: moment(Date.now()).format('HH:mm:ss'),
    endTime: moment(Date.now()).format('HH:mm:ss'),
  }

  addEvent = (event, category, date, startTime, endTime) => {
    const { dispatch, toggleEventForm } = this.props
    dispatch(addEvent(event, category, date, startTime, endTime))
    toggleEventForm(false)
  };

  handleInput = (state, value) => {
    this.setState({ [state]: value });
  }

  render() {
    const { toggleEventForm } = this.props;
    const { event, category, date, startTime, endTime } = this.state;

    return (
      <Form style={{ marginTop: '15px' }}>
        <Item>
          <Input
            placeholder="What's the Event?"
            onChange={e => this.handleInput('event', e.target.value)}
          />
        </Item>
        <Item>
          <Select
            placeholder="Select Category"
            onSelect={e => this.handleInput('category', e)}
          >
            <Option value="category1">Category 1</Option>
            <Option value="category2">Category 2</Option>
            <Option value="category3">Category 3</Option>
          </Select>
        </Item>
        <Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DatePicker
              onChange={e => this.handleInput('date', moment(e).format('MM/DD/YYYY'))}
            />
            <span>
              <TimePicker
                onChange={e => this.handleInput('startTime', moment(e).format('HH:mm:ss'))}
              />
              -
              <TimePicker
                onChange={e => this.handleInput('endTime', moment(e).format('HH:mm:ss'))}
              />
            </span>
          </div>
        </Item>
        <Item>
          <Button
            type="secondary"
            onClick={() => toggleEventForm(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => this.addEvent(event, category, date, startTime, endTime)}
          >
            Add Event
          </Button>
        </Item>
      </Form>
    )
  }
}
const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(EventForm)
