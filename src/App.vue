<template>
    <div id="app">
        <navbar id="navbar" @page1="page1" @page2="page2"></navbar>
        <page1 id="page1" v-if="state=='page1'"></page1>
        <page2 id="page2" v-else-if="state=='page2'"></page2>
    </div>
</template>

<script>
    import navbar from './components/navbar.vue'
    import page1 from './components/page1.vue'
    import page2 from './components/page2.vue'

    export default {
        name: 'App',
        components: {
            navbar, page1, page2
        },
        data(){
            return{
                state:localStorage.getItem("state")?localStorage.getItem("state"):'page1',
            }
        },
        mounted(){
        },
        methods:{
            page1(){
                localStorage.setItem('state','page1')
                this.state='page1'
            },
            page2(){
                localStorage.setItem('state','page2')
                this.state='page2'
            }
        }
    }
</script>

<style>
    body{
        margin: 0px;
        overflow-y: hidden;
        min-width: 300px;
    }
    #app {
        /*font-family: "EtelkaText-Bold";*/
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        text-align: center;
        display: grid;
    }
    #navbar{
        background: cornsilk;
        height: 50px;
    }
</style>
