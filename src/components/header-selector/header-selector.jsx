import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
class HeaderSelector extends Component {
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    state = {
        icon:""
    }
    constructor(props){
        super(props)
        this.headerList = []
        for(let i =0; i<20; i++){
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require('./images/头像'+(i+1)+'.png')
            })
        }
      this.setHeader = this.props.setHeader
    }
    handleClick = ({text,icon})=>{
        this.setState({
            icon,
        })
        this.setHeader(text)
    }
    render() {
        const {icon} = this.state
        const renderHeader = !this.state.icon?'请选择头像':(
            <div>
                <p>已选择头像：</p><img src={icon}></img>
            </div>
        )
        return (

            <List renderHeader={renderHeader}>
                
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}>  

                </Grid>
            </List>

        )
    }
}
export default connect(
    state => ({}),
    {}
)(HeaderSelector)