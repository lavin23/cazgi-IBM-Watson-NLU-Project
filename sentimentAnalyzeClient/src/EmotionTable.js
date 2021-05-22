import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {
                    //this.props.emotions connects to app.js/sendForEmotionAnalysis
                    //object.entries() creates array. map() performs arrow function on
                    //values, essentially returning two column table with emotion data
                    Object.entries(this.props.emotions).map((value) => {
                        return <tr><td>{value[0]}</td><td>{value[1]}</td></tr>
                    })
                }  
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
    

