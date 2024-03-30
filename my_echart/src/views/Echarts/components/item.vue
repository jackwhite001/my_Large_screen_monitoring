<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.item {
    height: 4.5rem;
    // border: 1px solid blue;
    box-shadow: 5px 5px #6e68dc;
    margin: 0.125rem;
    background-color: rgba(12, 139, 255, 0.85);
}
</style>
