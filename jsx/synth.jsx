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
            for (var i = 0; i < 8; i++) {
                columns.push(<StepColumn selectedNote={i} />);
            }
            return (
                <div>
                    Sequencer
                    {columns}
                </div>
            );
        }
    });
    var StepColumn = React.createClass({
        render() {
            var buttons = [];
            for (var i = 0; i < 8; i++) {
                buttons.push(<input type="radio"
                    data-note={i}
                    checked={i === this.props.selectedNote} />);
            }
            return (
                <form>
                    {buttons}
                </form>
            );
        }
    });

    React.render(<Synth />, document.getElementById('synth'));
}());
