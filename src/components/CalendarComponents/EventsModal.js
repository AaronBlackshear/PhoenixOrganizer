import React, { Component } from 'react'
import { Modal, Button, Icon } from 'antd'
import EventForm from './EventForm';

export default class EventsModal extends Component {
  state = {
    showEventForm: false,
  };

  toggleEventForm = bool => {
    this.setState({ showEventForm: bool })
  }

  render() {
    const { toggleModal, visible, } = this.props;
    const { showEventForm } = this.state;

    return (
      <Modal
        centered
        visible={visible}
        onOk={() => {
          toggleModal(false);
          this.toggleEventForm(false);
        }}
        onCancel={() => {
          toggleModal(false);
          this.toggleEventForm(false);
        }}
      >
        <Button type="primary" onClick={() => this.toggleEventForm(true)}>
          <Icon type="plus" />
          Add New Event
        </Button>
        {showEventForm && <EventForm toggleEventForm={this.toggleEventForm} />}
      </Modal>
    )
  }
}
