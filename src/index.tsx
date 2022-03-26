import { render } from "react-dom";
import {App} from "./App";
import { createServer, Model } from "miragejs";

createServer({
    models: {
        transaction: Model
    },

    seeds(server){
        server.db.loadData({
            transactions:[
                {
                    id:1,
                    title: 'Freelance system fintec',
                    type:'deposit',
                    category: 'Dev',
                    amount: 6000,
                    createdAt: new Date('2022-02-12 09:00:00')
                },
                {
                    id:2,
                    title: 'Aluguel',
                    type:'withdraw',
                    category: 'Casa',
                    amount: 2100,
                    createdAt: new Date('2022-02-14 10:00:00')
                }
            ]
        })
    },

    routes(){
        
        this.namespace='api';

        this.get('/transactions', ()=>{
            return this.schema.all('transaction');
        })

        this.post('/transactions', (schema, request)=>{
            const data = JSON.parse(request.requestBody);
            return schema.create('transaction', data);
        })
        
    }
});


render(<App/>, document.getElementById('root'))