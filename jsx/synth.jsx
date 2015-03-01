(function() {
    'use strict';
    var Synth = React.createClass({
        render() {
            return (
                <div>
                    <ControlPanel />
                    <Sequencer />
                </div>
            );
        }
    });
    var ControlPanel = React.createClass({
        render() {
            return (
                <div>
                    control panel
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
                    Sequencer
                    {columns}
                </div>
            );
        },

        getInitialState() {
            return {
                pattern: [0, 1, 2, 3, 4, 5, 6, 7]
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
                    onClick={this.handleClick.bind(this, i)}
                    />);
            }
            return (
                <form>
                    {buttons}
                </form>
            );
        },

        handleClick(note) {
            this.props.onNoteChange(this.props.step, note);
        }
    });

    React.render(<Synth />, document.getElementById('synth'));
}());
