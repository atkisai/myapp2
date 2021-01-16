<template>
    <div>
        <select @change="set_sumbol(sumbol)" v-model="sumbol">
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="BNBBTC">BNBBTC</option>
            <option value="ETHBTC">ETHBTC</option>
        </select>
        <br>
        <div v-for="i in get_sumbol" :key="i.get_sumbol">{{i}}</div>
    </div>
</template>

<script>
    export default {
        name: "page2",
        data(){
            return{
                sumbol:localStorage.getItem('sumbol2')?localStorage.getItem('sumbol2'):'btcusdt',
            }
        },
        computed:{
            get_sumbol(){
                let sumbol=this.$store.state.sumbol
                return sumbol
            },
        },
        methods:{
            set_sumbol(sumbol){
                localStorage.setItem('sumbol2',sumbol)
                this.$store.commit('sumbol', sumbol)
            },
        }
    }
</script>

<style scoped>
    .input{
        width: 100%;
        height: 70vh;
        background: white;
        overflow-x: hidden;
        overflow-y: visible;
    }
</style>