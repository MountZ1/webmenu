import { IonBackButton, IonButtons, IonContent, IonInput, IonPage, IonButton } from "@ionic/react";
import Header from "../components/Header";
import './tambah.css'
import { useGlobalStore } from "../library/fetch";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import FormView from "../components/Form";

function TambahMenu() {
    const history = useHistory();
    const {err, postData} = useGlobalStore();
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('');
    const [harga, setHarga] = useState('');
    const gambar = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formdata = new FormData();
        
        formdata.append('nama', nama);
        formdata.append('kategori', kategori);
        formdata.append('harga', harga);
        formdata.append('gambar', gambar.current!.files![0]);

        // console.log(formdata.values);
        
        try{
            postData('api/product', formdata);
            history.push('/tab1');
        } catch(error){
            console.log(err);
        }
    }
    return (
        <IonPage>
            <Header title="Tambah Menu" styling={{marginLeft: '-45px'}}><IonButtons slot="start"><IonBackButton defaultHref="/tab1"></IonBackButton></IonButtons></Header>
            <IonContent fullscreen>
                <FormView handleSubmit={handleSubmit} setNama={setNama} setKategori={setKategori} setHarga={setHarga} gambar={gambar} />
            </IonContent>
        </IonPage>
    );
}

export default TambahMenu;