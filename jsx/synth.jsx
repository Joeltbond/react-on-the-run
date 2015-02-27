(function () {
    var Synth = React.createClass({
            render: function () {
                return (
                    <div>
                        <ControlPanel />
                        <Sequencer />
                    </div>
                );
            }
        }),

        ControlPanel = React.createClass({
            render: function () {
                return (
                    <div>
                        control panel
                    </div>
                );
            }
        }),

        Sequencer = React.createClass({
            render: function () {
                var columns = [];
                for (var i=0; i < 8; i++) {
                    columns.push(<StepColumn />);
                }
                return (
                    <div>
                        Sequencer
                        {columns}
                    </div>
                )
            }
        }),

        StepColumn = React.createClass({
            render: function () {
                var buttons = [];
                for (var i = 0; i < 8; i++) {
                    buttons.push(<input type="radio" />);
                }
                return (
                    <form>
                        {buttons}
                    </form>
                )
            }
        })



    React.render(<Synth />, document.getElementById('synth'));
}());