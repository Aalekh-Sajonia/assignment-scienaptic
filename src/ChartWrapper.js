import React from 'react';
import D3Chart from './D3Chart';

export default class ChartWrapper extends React.Component {
     constructor(props) {
          super(props);
          this.chart = React.createRef();
     }
     
     componentDidMount() {
          console.log(this.props.temp);
          new D3Chart(this.chart.current, this.props.temp)
     }
     
     render() {
          return <div ref={this.chart} ></div>
     }
}