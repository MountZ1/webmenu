import React, { useEffect } from 'react';
import { IonInput, IonButton} from "@ionic/react";

interface FormViewProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    val?: {
        nama: string;
        kategori: string;
        harga: string;
        gambar: string;
    };
    setNama: React.Dispatch<React.SetStateAction<string>>;
    setKategori: React.Dispatch<React.SetStateAction<string>>;
    setHarga: React.Dispatch<React.SetStateAction<string>>;
    gambar: React.MutableRefObject<HTMLInputElement | null>;
    setOldGambar?: React.Dispatch<React.SetStateAction<string>>;
}
const FormView : React.FC<FormViewProps> = (props) => {
    return(
        <form onSubmit={props.handleSubmit} encType='multipart/form-data'>
                    <IonInput 
                        label="nama" 
                        labelPlacement="floating" 
                        fill="outline" 
                        placeholder="Nama Menu" 
                        className="lebar align-center" 
                        value={props.val?.nama}
                        onIonChange={(e: any) => props.setNama(e.target.value)} 
                        ></IonInput>
                    <IonInput 
                        label="kategori" 
                        labelPlacement="floating" 
                        fill="outline" 
                        placeholder="Kategori Menu" 
                        className="lebar align-center" 
                        value={props.val?.kategori}
                        onIonChange={(e: any) => props.setKategori(e.target.value)} 
                        ></IonInput>
                    <IonInput 
                        label="harga" 
                        labelPlacement="floating" 
                        fill="outline" 
                        placeholder="Harga Menu" 
                        className="lebar align-center" 
                        value={props.val?.harga}
                        onIonChange={(e: any) => props.setHarga(e.target.value)} 
                        ></IonInput>
                    {
                        props.val?.gambar ? (
                            <>
                                {/* <input type="hidden" name="oldgambar" id="oldgambar" value={props.val.gambar} onChange={(e: any) => props.setOldGambar?(e.target.value):null}/> */}
                                <img src={`http://10.0.0.127:8000/storage/${props.val?.gambar}`} alt="Gambar Menu" className='imgupdate'/>
                                <br />
                            </>
                        ) : null
                    }
                    <input type="file" name="gambar" id="gambar" className="inputgambar" ref={props.gambar}/>
                    <IonButton className="simpan" type="submit">Simpan</IonButton>
        </form>
    )
}

export default FormView