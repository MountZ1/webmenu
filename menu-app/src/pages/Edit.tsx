import { IonBackButton, IonButtons, IonContent, IonInput, IonPage, IonButton } from "@ionic/react";
import Header from "../components/Header";
import { useGLobalUpdate } from "../library/fetch";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FormView from "../components/Form";

const baseUrl = 'http://10.0.0.127:8000';

const Edit: React.FC = () => {
    const history = useHistory();
    const {err, updateData} = useGLobalUpdate();
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('');
    const [harga, setHarga] = useState('');
    const [oldgambar, setOldGambar] = useState('');
    const gambar = useRef<HTMLInputElement>(null);
    let loc:any = useLocation();
    let data:any = loc.state?.product;
    
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formdata = new FormData();
        
        formdata.append("id", data.id);
        formdata.append("nama", nama || data.nama);
        formdata.append("kategori", kategori || data.kategori);
        formdata.append("harga", harga || data.harga);
        formdata.append("oldgambar", data.gambar);
        formdata.append("gambar", gambar.current!.files![0]);

        // for (const entry of formdata.entries()) {
        //     console.log(entry[0], entry[1]);
        // }

        
        try{
            updateData(`api/product/${data.id}`, formdata);
            // await fetch(`${baseUrl}/api/product/${data.id}`, {
            //     method: 'PATCH',
            //     headers: {'content-type': 'multipart/form-data','accept': 'application/json' },
            //     body: JSON.stringify({
            //         "nama" : nama || data.nama,
            //         "kategori" : kategori || data.kategori,
            //         "harga" : harga || data.harga,
            //         "oldgambar" : data.gambar || oldgambar,
            //         "gambar" : gambar.current!.files![0],
            //     })
            // })
            history.push('/tab1');
        } catch(error){
            console.log(err);
        }
    }
    return (
        <IonPage>
            <Header title={`Edit Menu ${data?.nama}`} styling={{marginLeft: '-45px'}}>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/tab1"></IonBackButton>
                </IonButtons>
            </Header>
            <IonContent>
                <FormView handleSubmit={handleSubmit} setNama={setNama} setKategori={setKategori} setHarga={setHarga} gambar={gambar} val={data} setOldGambar={setOldGambar}/>
            </IonContent>
        </IonPage>
    );
}

export default Edit;