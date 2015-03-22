import React from 'react';
import SynthActions from '../actions/synthactions';

export default class StepColumn extends React.Component {
    render() {
        var buttons = [];
        for (var i = 7; i >= 0; i--) {
            buttons.push(<input type="radio"
                data-note={i}
                checked={i === this.props.note}
                key={i}
                onChange={this.handleNoteChange.bind(this, i)}
                />);
        }
        return (
            <div className={'StepColumn col-'
                + this.props.step
                + (this.props.active ? ' active' : '')}>
                {buttons}
            </div>
        );
    }

    handleNoteChange(note) {
        SynthActions.changeNote(this.props.step, note);
    }
}
