import Admin from './Admin'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import App from './App'
import Home from './components/home'
import NoMatch from './pages/nomatch/index'
import Buttons from './pages/ui/Buttons'
import Modals from './pages/ui/Modals'
import Loadings from './pages/ui/Loadings'
import Notices from './pages/ui/Notices'
import messages from './pages/ui/Messages'
import Tabs from './pages/ui/Tabs'
import Gallerys from './pages/ui/Gallery'
import Carousels from './pages/ui/carousel'
import Login from './pages/form/login'
import Reg from './pages/form/reg'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detailt'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Rich from './pages/rich'
import Permission from './pages/permission'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/common" render={()=>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        }/>
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/ui/buttons" component={Buttons}/>
                                    <Route path="/ui/modals" component={Modals}/>
                                    <Route path="/ui/loadings" component={Loadings}/>
                                    <Route path="/ui/notification" component={Notices}/>
                                    <Route path="/ui/messages" component={messages}/>
                                    <Route path="/ui/Tabs" component={Tabs}/>
                                    <Route path="/ui/gallery" component={Gallerys}/>
                                    <Route path="/ui/carousel" component={Carousels}/>
                                    <Route path="/form/login" component={Login}/>
                                    <Route path="/form/reg" component={Reg}/>
                                    <Route path="/table/basic" component={BasicTable}/>
                                    <Route path="/table/high" component={HighTable}/>
                                    <Route path="/city" component={City}/>
                                    <Route path="/order" component={Order}/>
                                    <Route path="/user" component={User}/>
                                    <Route path="/bikeMap" component={BikeMap}/>
                                    <Route path="/charts/bar" component={Bar}/>
                                    <Route path="/charts/pie" component={Pie}/>
                                    <Route path="/charts/line" component={Line}/>
                                    <Route path="/rich" component={Rich}/>
                                    <Route path="/permission" component={Permission}/>
                                    <Redirect to="/home"/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
