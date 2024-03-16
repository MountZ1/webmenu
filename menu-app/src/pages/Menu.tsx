import { IonContent, IonSpinner, IonPage, IonText, IonButton, IonNavLink, IonRouterOutlet, } from '@ionic/react';
import './Tab1.css';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { useEffect} from 'react';
import globalLoading  from '../library/loading';
import {useGlobalFetching} from '../library/fetch';
import TambahMenu from './Tambah';

const Menu: React.FC = () => {
  const {hook, fetch} = useGlobalFetching('api/product');
  const {loading, setLoadingState} = globalLoading();

  useEffect(() => {
    setLoadingState(true);
    fetch().then(() =>  setLoadingState(false));
  }, []);

  return (
    <IonPage>
      <Header title="Menu"/>
      <IonContent fullscreen>
        <IonNavLink routerDirection="forward" component={() => <TambahMenu />}>
          <IonButton shape='round' fill='outline' size='small' className='ion-float-end add-button' href='/tambah'>Tambah</IonButton>
        </IonNavLink>
        <br /><br />
          {loading ? ( 
            <div style={{ textAlign: 'center', paddingTop: '50px' }}>
              <IonSpinner name="lines-sharp" />
              <IonText color={'medium'}><p>Loading...</p></IonText>
            </div>
          ) : (
            <Cards product={hook} /> 
          )}
      </IonContent>
    </IonPage>
  );
};

export default Menu;
