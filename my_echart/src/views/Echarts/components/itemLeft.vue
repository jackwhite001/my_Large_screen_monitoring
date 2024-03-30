<template>
    <div class="left">
        <h1>我是left</h1>
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.left {
    height: 5.125rem;
    border: 1px solid blue;
    margin: 1.25rem;
    background-color: rgba(12,139,255,.85);
}
</style>
