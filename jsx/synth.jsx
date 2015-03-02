(function() {
    'use strict';
    var Synth = React.createClass({
        render() {
            return (
                <div>
                    <Sequencer />
                </div>
            );
        }
    });
    var Sequencer = React.createClass({
        render() {
            var columns = [];

            this.state.pattern.forEach((note, index) => {
                columns.push(<StepColumn
                    note={note}
                    step={index}
                    key={index}
                    onNoteChange={this.handleNoteChange}
                    active={index === this.state.currentStep}
                    />);
            });

            return (
                <div className="Sequencer">
                    <div className="steps-wrapper">
                        {columns}
                    </div>
                    <div className="transport">
                        <button onClick={this.stepForward}>Step</button>
                    </div>
                </div>
            );
        },

        getInitialState() {
            return {
                pattern: [0, 1, 2, 3, 4, 5, 6, 7],
                currentStep: 0
            };
        },

        handleNoteChange(step, note) {
            var pattern = this.state.pattern.slice();
            pattern[step] = note;
            this.setState({
                pattern: pattern
            });
        },

        stepForward() {
            var nextStep = this.state.currentStep === 7
                ? 0 : this.state.currentStep + 1;
            this.setState({currentStep: nextStep});
        }
    });
    var StepColumn = React.createClass({
        render() {
            var buttons = [];
            for (var i = 7; i >= 0; i--) {
                buttons.push(<input type="radio"
                    data-note={i}
                    checked={i === this.props.note}
                    key={i}
                    onChange={this.handleChange.bind(this, i)}
                    />);
            }
            return (
                <div className={'StepColumn col-'
                    + this.props.step
                    + (this.props.active ? ' active' : '')}>
                    {buttons}
                </div>
            );
        },

        handleChange(note) {
            this.props.onNoteChange(this.props.step, note);
        }
    });

    React.render(<Synth />, document.getElementById('synth'));
}());
