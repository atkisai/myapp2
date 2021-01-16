<template>
<div>
    <nav id="nav">
        <a @click="$emit('page1')" class="link">Page1</a>
        <a @click="$emit('page2')" class="link">Page2</a>
    </nav>
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
    }
    .link:hover{
        color: aqua;
    }
</style>