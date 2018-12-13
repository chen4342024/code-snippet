<template>
    <div class="home">主页</div>
</template>

<script>
import { deepCopy } from "../utils/util.js";
export default {
    name: "home",
    components: {},
    data() {
        return {};
    },

    created() {
        let d = { d: 1 };
        let obj = { c: 1, d: d };
        let b = { a: obj, d: d };
        obj.b = b;
        const result = deepCopy(obj);
        console.log(result);
    },

    methods: {}
};
</script>

<style scoped lang="scss">
.btn {
    border: 1px solid #cccccc;
    width: 7rem;
    margin: 0 auto;
    display: block;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.28rem;
}

h3 {
    font-size: 0.4rem;
    padding: 0.1rem;
}

.btn-container {
    padding: 0.3rem;
}

.list-complete-group {
}

.list-complete-item {
    transition: all 0.5s;
    display: inline-block;
    /* margin-right: 10px; */
    width: 0.6rem;
    height: 0.8rem;
    /* line-height: 0.8rem; */
    padding-top: 0.1rem;
    text-align: center;
    vertical-align: bottom;
    background: #a9d4e3;
    margin: 0.02rem;
}

.list-complete-item.active {
    background: #008100;
}
.list-complete-item.empty {
    // opacity: 0;
    vertical-align: top;
}

.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}

.list-complete-container {
    height: 5rem;
    background: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.result-container {
    text-align: left;
    padding: 0.3rem;

    > p {
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
}
.cat-btn {
    margin-top: 0.1rem;
}
</style>
