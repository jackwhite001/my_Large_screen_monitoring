<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.item {
    height: 5.125rem;
    border: 1px solid blue;
    margin: 0.25rem;
    background-color: rgba(12, 139, 255, 0.85);
}
</style>
