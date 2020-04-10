import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
const Header = Card.Header;
const Body = Card.Body;
export default class userLists extends Component {
    static propTyps = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const { userList } = this.props
        console.log(userList)

        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace></WhiteSpace>
                            <Card>
                                {user.header ? <Header thumb={require(`../../assets/images/${user.header}.png`)} extra={`${user.username}`}></Header> : null}

                                <Body>
                                    {user.post ? <div>职位：{`${user.post}`}</div> : null}

                                    {user.company ? <div>公司：{`${user.company}`}</div> : null}
                                    {user.salary ? <div>月薪：{`${user.salary}`}</div> : null}
                                    {user.info ? <div>描述：{`${user.info}`}</div> : null}

                                </Body>
                            </Card>
                        </div>
                    ))
                }

            </WingBlank>
        )
    }
}
