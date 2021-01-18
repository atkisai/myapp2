<template>
<div>
    <div>
        <nav class="nav">
            <a @click="$emit('page1')" class="link">Page1</a>
            <a @click="$emit('page2')" class="link">Page2</a>
        </nav>
    </div>
</div>
</template>

<script>
    export default {
        name: "navbar",
        mounted(){
        }
    }
</script>

<style scoped>
    .link{
        cursor:pointer;
        padding: 10px;
        border: 1px solid #dcdcdc;
        font-weight: 500;
        color: cornsilk;
        border-radius: 8px;
        background: gainsboro;
        margin: 2px;
    }
    .link:hover{
        color: white;
        background: grey;
        box-shadow: 1px 1px 8px 1px
    }
    .nav{
        margin:2px;
    }
</style>