<template>
<div class="main">
    <select @change="sdk(sumbol)" v-model="sumbol">
        <option value="btcusdt">BTCUSDT</option>
        <option value="bnbbtc">BNBBTC</option>
        <option value="ethbtc">ETHBTC</option>
    </select>
    <!--<select @change="time(second)" v-model="second">-->
        <!--<option value="1000">1s</option>-->
        <!--<option value="5000">5s</option>-->
        <!--<option value="10000">10s</option>-->
    <!--</select>-->
    <button @click="sdk('')">Stop WS</button>
    <div class="block0">

        <div class="bid">
            <p>Bid(спрос)</p>
            <div class="block1">
                <div>Amount</div>
                <div>Price</div>
                <div>Total</div>
            </div>
            <div class="block1" v-for="i in sdk_bid" :key="i.sdk_bid">
                <div>{{(i[1])}}</div>
                <div>{{Number(i[0]).toFixed(8)}}</div>
                <div>{{(i[1]*i[0]).toFixed(2)}}</div>
            </div>
        </div>

        <div class="ask">
            <p>Ask(предложение)</p>
            <div class="block1 ask">
                <div>Amount</div>
                <div>Price</div>
                <div>Total</div>
            </div>
            <div class="block1" v-for="i in sdk_ask" :key="i.sdk_ask">
                <div>{{i[1]}}</div>
                <div>{{i[0]}}</div>
                <div>{{(i[1]*i[0]).toFixed(2)}}</div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
    export default {
        name: "page1",
        data(){
            return{
                sumbol:localStorage.getItem('sumbol')?localStorage.getItem('sumbol'):'btcusdt',
                // second:localStorage.getItem('second')?localStorage.getItem('second'):'1000',
                fixed:'',
            }
        },
        created(){
        },
        computed:{
            sdk_bid(){
                let sdk=this.$store.state.sdk
                if (sdk!=''){
                    // this.time()
                    return JSON.parse(sdk).b.reverse()
                }else{
                    return sdk.b
                }
            },
            sdk_ask(){
                let sdk=this.$store.state.sdk
                if (sdk!=''){
                    // this.time()
                    return JSON.parse(sdk).a
                }else{
                    return sdk.a
                }
            },
        },
        mounted(){
            this.$store.commit('sdk', this.sumbol)
        },
        methods:{
            sdk(sumbol){
                if(sumbol != ''){
                    if (this.$store.state.socket!=''){
                        this.$store.state.socket.close()
                    }
                    localStorage.setItem('sumbol',sumbol)
                    this.$store.commit('sdk', sumbol)
                }else{
                    if (this.$store.state.socket!=''){
                        this.$store.state.socket.close()
                    }
                }
            },
            // time(second){
            //     if(second==undefined){
            //         setTimeout(console.log(this.second),10000)
            //     }else{
            //         localStorage.setItem('second',second)
            //     }
            //
            // }
        },
        destroyed(){
            this.$store.state.socket.close()
        }
    }

</script>

<style scoped>
    .block0{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2vw;
        justify-content: center;
        overflow-y:scroll;
        height: calc(100vh - 56px);
    }
    .block1{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .block1>div{
        padding: .5em;
        text-align: center;
    }
    .bid{
        background: aquamarine;
    }
    .ask{
        background: coral;
    }
    .main{
        justify-content: center;
    }
</style>