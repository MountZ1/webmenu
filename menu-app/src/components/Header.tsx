import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import './Header.css';
import React from "react";

const Header: React.FC<{title:string, children?: React.ReactNode, styling?: React.CSSProperties}> = (props) => {
    return(
        <IonHeader>
            <IonToolbar>
                <IonTitle style={props.styling}>{props.title}</IonTitle>
                {props.children}
            </IonToolbar>
        </IonHeader>
    );
}

export default Header;