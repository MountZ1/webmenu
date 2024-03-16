import { IonSelectOption, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonButton, IonPopover, IonContent, IonList, IonItem, IonAlert } from "@ionic/react";
import './Cards.css';
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useGlobalDelete, useGLobalUpdate } from "../library/fetch";

const Cards: React.FC<{product : any}> = ( {product} ) => {
    const renderedCard : JSX.Element[] = [];
    const {err, deleteData} = useGlobalDelete();
    const {updateData} = useGLobalUpdate();
    const [dismiss, setDismiss] = useState(false);
    // const isProductEmpty = product.length === 0;
    // console.log(isProductEmpty);

    const searchById = (id : number) => {
        return product.find((pd : any) => pd.id === id);
    }


    // const deleteById = (id : number) => {
    //     try{
    //         deleteData('api/product', id);
    //     } catch(error){
    //         console.log(err);
    //     }
    // }

    product.forEach((pd : any, index : number) => {
        const triggerId = `action-trigger-${index}`
        const alertId = `action-alert-${index}`
        const cardStyle = pd.status === 0 || false ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'white' };
        const buttonSet = pd.status === 0 || false ? {text: 'Ubah Tersedia'} : {text: 'Ubah Tidak Tersedia'}
        renderedCard.push(
            <IonCard key={index} style={cardStyle}>
                <img alt={pd.gambar} src={`http://10.0.0.127:8000/storage/${pd.gambar}`} />
                <IonCardHeader >
                    <IonCardTitle style={cardStyle}>{pd.nama}</IonCardTitle>
                    <IonCardSubtitle style={cardStyle}>Rp. {pd.harga}</IonCardSubtitle>
                    <IonButton id={triggerId} className="action-button" onClick={() => searchById(pd.id)}>Action</IonButton>
                    <IonPopover trigger={triggerId} backdropDismiss={true}>
                        <IonContent>
                            <IonList>
                                <Link to={{ 
                                    pathname: `/edit`,
                                    state: { product: pd },
                                 }} className="link" ><IonItem button={true}>Edit</IonItem></Link>
                                <IonItem button={true} id={alertId}>Delete</IonItem>
                                <IonAlert
                                header = {`anda yakin ingin menghapus ${pd.nama}`}
                                // isOpen={alertOpen}
                                // onDidDismiss={() => setAlertOpen(false)}
                                trigger={alertId}
                                buttons={[
                                    {text: 'Cancel', role: 'cancel'},
                                    {text: 'Delete', handler: () => {
                                        deleteData(`api/product/${pd.id}`);
                                        // console.log(pd);
                                    }}
                                ]}
                                >
                                </IonAlert>
                                <IonItem button={true} onClick={ async () => {
                                    const newStatus = pd.status === 0 ? 1 : 0;
                                    await fetch(`http://10.0.0.127:8000/api/product/${pd.id}/status`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'multipart/json' },
                                        body: JSON.stringify({status: newStatus})
                                    });
                                    // updateData(`api/product/${pd.id}/status`, newStatus);

                                }
                                }>{buttonSet.text}</IonItem>
                            </IonList>
                        </IonContent>
                    </IonPopover>
                </IonCardHeader>
            </IonCard>
        )
    });

    return(
        <>
            {renderedCard}
        </>

    )
}

export default Cards;