import React from 'react';
import { observer, inject } from "mobx-react";
import './popup.css';


@inject("PopupStore")
@observer
class Popup extends React.Component {

    handleClick() {
        // const {PopupStore} = this.props
        // PopupStore.hidePopup()
        console.log('You clicked the "close me" button')
    }

    render() {
        const {PopupStore} = this.props

        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <h1>{PopupStore.name}</h1>
                    <img src={PopupStore.image} id="popup_image"></img>
                    <button onClick={e => PopupStore.hidePopup()}>close me</button>
                </div>
            </div>
        );
    }
}

export default Popup;
