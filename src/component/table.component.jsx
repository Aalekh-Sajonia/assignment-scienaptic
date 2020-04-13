import React from 'react';
import {Link} from 'react-router-dom';
import './table.styles.css';

export default class But extends React.Component {
     
     constructor() {
          super();
          this.state = { 
          data: null
          }
     }

     componentDidMount() {
          fetch('https://cors-anywhere.herokuapp.com/https://extendsclass.com/api/json-storage/bin/deeaabd')
               .then(response => {
                    return response.json();
               })
               .then((data) => {
                    this.setState((state) => {
                         return {data: data };
                    })
                    console.log(this.state);
               });
          
     }

     renderTableData() {
          return this.state.data.map((data,index) => {
               const {conceptName,statType,uniqueCount,nullCount} = data;
               return (
                    <tr key={index}>
                         <td><Link to={{
                              pathname: `/chart/${conceptName.toLowerCase()}`,
                         }}>{conceptName}</Link></td>
                         <td>{statType}</td>
                         <td>{uniqueCount}</td>
                         <td>{nullCount}</td>
                    </tr>
               )
          })
     }

     renderTableHeader() {
          return (
                    [
                         <th key="0">Concept Name</th>,
                         <th key="1">Type</th>,
                         <th key="2">Unique Values</th>,
                         <th key="3">Missing Values</th>
                    ]
          );
     }

     render() {
          return (
               <div>
                    <table id="data">
                         <tbody>
                              {this.state.data ? <tr>{this.renderTableHeader()}</tr> : null}
                              {this.state.data ? this.renderTableData() : null}
                         </tbody>
                    </table>
               </div>
          )
     }
}