import React, {lazy, Suspense} from 'react';
import {Switch,Route} from 'react-router-dom';
const But = lazy(() => import('./component/table.component'));
const Chart = lazy(() => import('./component/chart.component'));
export default class MainPage extends React.Component {
     
     render() {
          return (
               <div>
                    <Switch>
                         <Suspense fallback={<div>...Loading</div>}>
                              <Route exact path="/"  component={But} />
                              <Route path="/chart"  component={Chart} />
                         </Suspense>
                    </Switch>
               </div>
          )
     }
}
