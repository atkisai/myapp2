<template>
<div class="main">
    <select class="l menu" @change="sdk(sumbol)" v-model="sumbol">
        <option value="btcusdt">BTCUSDT</option>
        <option value="bnbbtc">BNBBTC</option>
        <option value="ethbtc">ETHBTC</option>
    </select>
    <!--<select class="l menu" @change="time(second)" v-model="second">-->
        <!--<option value="1000">1s</option>-->
        <!--<option value="5000">5s</option>-->
        <!--<option value="10000">10s</option>-->
    <!--</select>-->
    <button class="l start_stop menu" @click="sdk_button()" :style="hoverButton">{{button}}</button>
    <button class="l style menu" @click="changeStyle()">Style</button>

    <div class="block0">

        <div class="bid">
            <p>Bid(спрос)</p>
            <div class="block1" :style="{border:styleColor}">
                <div>Amount</div>
                <div>Price</div>
                <div>Total</div>
            </div>
            <div v-for="i in sdk_bid" :key="i.sdk_bid">
                <div class="block1" v-if="Number(i[1])!=0" :style="{border:styleColor}">
                    <div>{{Number(i[1].replace(/0*$/,""))}}</div>
                    <div>{{Number(i[0].replace(/0*$/,""))}}</div>
                    <div>{{(i[1]*i[0]).toFixed(0)}}</div>
                </div>
            </div>
        </div>

        <div class="ask">
            <p>Ask(предложение)</p>
            <div class="block1" :style="{border:styleColor}">
                <div>Amount</div>
                <div>Price</div>
                <div>Total</div>
            </div>
            <div v-for="i in sdk_ask" :key="i.sdk_ask">
                <div class="block1" v-if="Number(i[1])!=0" :style="{border:styleColor}">
                    <div>{{Number(i[1].replace(/0*$/,""))}}</div>
                    <div>{{Number(i[0].replace(/0*$/,""))}}</div>
                    <div>{{(i[1]*i[0]).toFixed(0)}}</div>
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "page1",
        data(){
            return{
                sumbol:localStorage.getItem('sumbol')?localStorage.getItem('sumbol'):'btcusdt',
                second:localStorage.getItem('second')?localStorage.getItem('second'):'1000',
                fixed:'',
                button:'Stop',
                styleColor:localStorage.getItem('styleColor')?localStorage.getItem('styleColor'):'1px solid white',
            }
        },
        created(){
        },
        computed:{
            sdk_bid(){
                let sdk=this.$store.state.sdk
                if (sdk!=''){
                    if (window.innerWidth>=630){
                        return JSON.parse(sdk).b
                    }else{
                        return JSON.parse(sdk).b.reverse()
                    }
                }else{
                    return sdk.b
                }
            },
            sdk_ask(){
                let sdk=this.$store.state.sdk
                if (sdk!=''){
                    return JSON.parse(sdk).a
                }else{
                    return sdk.a
                }
            },
            hoverButton(){
                if(this.button=='Stop'){
                    return {'--background-hover': 'red'}
                }else{
                    return {'--background-hover': 'green'}
                }
            }
        },
        mounted(){
            this.$store.commit('sdk', this.sumbol)
            axios.get('https://api.binance.com/api/v3/exchangeInfo').then((response) => {
                console.log(response);

            });
        },
        methods:{
            sdk(sumbol){
                if(sumbol != ''){
                    if (this.$store.state.socket!=''){
                        this.$store.state.socket.close()
                    }
                    this.button='Stop'
                    localStorage.setItem('sumbol',sumbol)
                    this.$store.commit('sdk', sumbol)
                }else {
                    if (this.$store.state.socket!=''){
                        this.$store.state.socket.close()
                    }
                }
            },
            sdk_button(){
                if (this.button=="Stop"){
                    this.button="Start"
                    this.$store.state.socket.close()
                }else{
                    this.button="Stop"
                    this.$store.commit('sdk', this.sumbol)
                }
            },
            changeStyle(){
                if(this.styleColor=='1px solid white'){
                    localStorage.setItem('styleColor','1px solid black')
                    this.styleColor='1px solid black'
                }else if(this.styleColor=='1px solid black'){
                    localStorage.setItem('styleColor','none')
                    this.styleColor='none'
                }else if(this.styleColor=='none'){
                    localStorage.setItem('styleColor','1px solid white')
                    this.styleColor='1px solid white'
                }
            },
            time(second) {
                if (second != undefined) {
                    localStorage.setItem('second', second)
                }else{
                    setTimeout(()=>console.log(this.second), Number(this.second))
                }
            }
        },
        destroyed(){
            this.$store.state.socket.close()
        }
    }

</script>

<style scoped>
    .block0{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
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
        padding: .2em;
        text-align: center;
        font-size: 13px;
    }
    .bid{
        background: aquamarine;
        border-radius: 8px;
    }
    .ask{
        background: coral;
        border-radius: 8px;
    }
    .start_stop:hover{
        color: white;
        background: var(--background-hover);
    }
    .style:hover{
        color: white;
        background: grey;
        box-shadow: 0px 15px 20px
        rgba(33,33,33,.2);
    }
    .menu{
        margin: 2px;
        border-radius: 8px;
        width: 90px;
        border:1px solid #dcdcdc;
        cursor: pointer;
        color: black;
        transition: box-shadow .3s;
        transition: background .3s;
    }
    .menu:focus{
        outline: none;
    }
    .menu:hover{
        box-shadow: 1px 1px 8px 1px
        rgba(33,33,33,.2);
        /*box-shadow: 0px 15px 20px;*/
        /*box-shadow: 0 0 11px*/
        /*rgba(33,33,33,.2);*/
    }
</style>