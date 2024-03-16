import { IonAccordion, IonAccordionGroup, IonButton, IonItem, IonLabel, IonTitle } from "@ionic/react"
import './accordion.css';

interface AccordionProps {
    title : string,
    data : any
}
const Accordion: React.FC<AccordionProps> = ({title, data}) => {
    const renderAccordion : JSX.Element[] = []
    

    const handleStatus = async (status : any, id : any, invoice : any) => {
        await fetch(`http://10.0.0.127:8000/api/order/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({invoice : invoice, status: status})
        }).then(() => window.location.reload())
    }

    if (data.length === 0){
        renderAccordion.push(<IonLabel>Tidak ada data</IonLabel>)
    }else{
        data.forEach((inv : any, index : number)=> {
            const style : any = () => {
                if (inv.status === "pending"){
                    return("danger")
                } else if (inv.status === "selesai"){
                    return("success")
                } else if (inv.status === "diproses"){
                    return("warning")
                }
            }
            const buton = () => {
                if (inv.status === "pending"){
                    return (
                        <div className="buttonConfirm">
                            <IonButton onClick={() => handleStatus('tolak', inv.id, inv.invoice)} color="danger">Tolak</IonButton>
                            <IonButton onClick={() => handleStatus('diproses', inv.id, inv.invoice)} color="warning">Proses</IonButton>
                        </div>
                    )
                } else if (inv.status === "diproses"){
                    return (
                        <IonButton onClick={() => handleStatus('selesai', inv.id, inv.invoice)} color="success">Selesaikan</IonButton>
                    )
                }
            }
            renderAccordion.push(
                <IonAccordionGroup key={`${inv.invoice}-${index}`}>
                    <IonAccordion value={inv.invoice} key={`${inv.invoice}-${index}`} style={{ paddingBottom: '10px' }}>
                        <IonItem slot="header" color={style()}>
                            <IonLabel>{inv.invoice}</IonLabel>
                        </IonItem>
                        <div slot="content" className="listrender">
                            <p>Nama : {inv.nama_customer}</p>
                            <p>No Telp : {inv.no_telp}</p>
                            <p>Alamat : {inv.alamat}</p>
                            <p>Status : {inv.status}</p>
                            <div>
                                <p>Detail Pesanan : </p>
                                {inv.detail_pembelians.map((dt: any, innerIndex: number) => {
                                    return (
                                        <div key={`${inv.invoice}-${innerIndex}`} style={{ paddingLeft: '5px', fontStyle: 'Bold' }}>
                                            <ul key={`${inv.invoice}-${innerIndex}`}>
                                                <li><b>{dt.nama_product} - {dt.jml_pembelian}</b></li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                            <p>Total : Rp. {inv.total}</p>
                            {buton()}
                        </div>
                    </IonAccordion>
                </IonAccordionGroup>
            )
        });
    }

    return (
        <div className="ion-padding" key={data.id}>
            <IonTitle style={{ paddingLeft: '0px' }}>{title}</IonTitle>
            <br />
            {renderAccordion}
        </div>
    )
}

export default Accordion