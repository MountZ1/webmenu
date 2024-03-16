import { IonContent, IonPage, IonSpinner, IonText,} from '@ionic/react';
import './Tab2.css';
import Header from '../components/Header';
import globalLoading from '../library/loading';
import { useGlobalFetching } from '../library/fetch';
import Echo, { Channel } from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import Accordion from '../components/Accordion';
import ColoredLine from '../components/coloredLines';

declare global{
  interface Window {
    Echo: any;
    Pusher: any;
    channel: any;
  }
}

const Transaction: React.FC = () => {
  // const {hook, fetch} = useGlobalFetching('api/order');
  const {loading, setLoadingState} = globalLoading();
  const [newOrder, setNewOrder] = useState<any>([]);
  const [order, setOrder] = useState<any>([])
  const [finishedOrder, setFinishedOrder] = useState<any>([])

  useEffect(() => {
    setLoadingState(true);

    const fetchData = async () => {
      const response = await fetch('http://10.0.0.127:8000/api/order');
      const data = await response.json();
      const newOrderPending : any = filterPendingOrders(data, "pending");
      setNewOrder(newOrderPending);
      const orders = data.filter((order : any) => order.status === "diproses");
      setOrder(orders);
      const finishedOrders = data.filter((order : any) => order.status === "selesai");
      setFinishedOrder(finishedOrders);
      // console.log(orders);
      // console.log(finishedOrders);
      setLoadingState(false);
      // console.log(data); // Log the fetched data
    };
    fetchData();

    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '784a41065f926f351952',
      cluster: 'ap1',
      forceTLS: true
    });

    let channel = window.Echo.channel('orders');
  
    // let channel = echo.channel('my-channel');
    channel.listen('NewOrders', function(data: any) {
      if (!data || !data.orders) {
        console.error("Received invalid data from 'NewOrders' event. Missing 'orders' property.");
        return;
      }
    
      const orders = data.orders;
    
      const pendingOrders = orders.filter((order: any) => order.status === 'pending');
      // const processingOrders = orders.filter((order: any) => order.status === 'diproses');
      // const finishedOrders = orders.filter((order: any) => order.status === 'selesai');

      const filterOrder = (prev : any, newo : any) => {
        const newOrders = newo.filter((order : any) => {
          return !prev.some((existingOrder : any) => existingOrder.inv === order.inv);
        })

        return [...prev, ...newOrders];
      }

      setNewOrder((prev : any) => filterOrder(prev, pendingOrders));
      // setOrder((prev : any) => filterOrder(prev, processingOrders));
      // setFinishedOrder((prev : any) => filterOrder(prev, finishedOrders));
    });

    function filterPendingOrders(orders: [], status : any){
      if (!orders || orders.length === 0) {
        return [];
      }

      const filteredOrders = orders.filter((order : any) => order.status === `${status}`);
      return filteredOrders;
    }

  },[])
  return (
    <IonPage>
      <Header title="Transaksi"/>
      <IonContent fullscreen>
        {loading ? ( 
            <div style={{ textAlign: 'center', paddingTop: '50px' }}>
              <IonSpinner name="lines-sharp" />
              <IonText color={'medium'}><p>Loading...</p></IonText>
            </div>
          ) : (
            <div>
              <Accordion title="New Order" data={newOrder}/>
              <br />
              <ColoredLine color='black'/>
              <Accordion title="Process Order" data={order}/>
              <br />
              <ColoredLine color='black'/>
              <Accordion title="Finished Order" data={finishedOrder}/>
            </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Transaction;
