import Axios from 'axios';

// export async function Connection(url: string) {
//     try {
//         const response = await Axios.get(`http://10.0.0.127:8000/${url}`).then(response => response.data);
//         return response.data;
//     } catch(error) {
//         throw error;
//     }
// }
// const headers = {
//     'Content-Type': 'application/json',
//     'allowed_origins': '*',
//     'allowed_headers': '*',
//     'Accept': 'application/json, text/plain'
//   };

const Connection = Axios.create({
    baseURL: 'http://10.0.0.127:8000/',
    headers: {
            'Content-Type': 'multipart/form-data',
            'allowed_origins': '*',
            // 'allowed_origins': 'http://localhost:8100',
            'allowed_headers': '*',
            'Accept': 'application/json, text/plain, multipart/form-data',
            'setContentType': 'multipart/form-data',
    },
    
    // 'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Headers': '*',
    //       'Accept': 'application/json, text/plain
})

export default Connection;