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
                    />);
            });

            return (
                <div>
                    {columns}
                </div>
            );
        },

        getInitialState() {
            return {
                pattern: [7, 6, 5, 4, 3, 2, 1, 0]
            };
        },

        handleNoteChange(step, note) {
            var pattern = this.state.pattern.slice();
            pattern[step] = note;
            this.setState({
                pattern: pattern
            });
        }
    });
    var StepColumn = React.createClass({
        render() {
            var buttons = [];
            for (var i = 0; i < 8; i++) {
                buttons.push(<input type="radio"
                    data-note={i}
                    checked={i === this.props.note}
                    key={i}
                    onChange={this.handleChange.bind(this, i)}
                    />);
            }
            return (
                <div className={'StepColumn col-' + this.props.step}>
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
