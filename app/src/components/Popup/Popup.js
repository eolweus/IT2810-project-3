import React from 'react';
import {inject, observer} from "mobx-react";
import {Button} from '@material-ui/core'
import './popup.css';


@inject("PopupStore")
@observer
class Popup extends React.Component {

    handleClick() {
    }

    render() {
        const {PopupStore} = this.props;

        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <img src={PopupStore.image} id="popup_image"></img>
                    <div>
                        <Button variant="contained" onClick={e => PopupStore.hidePopup()}>close</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
