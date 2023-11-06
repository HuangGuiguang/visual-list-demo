<template>
    <div class="container" ref="virtualList">
        <!-- 占位, 用于形成滚动条 -->
        <div class="phantom" :style="{ height: listHeight + 'px' }"></div>
        <!-- 实际展示的内容列表 -->
        <div class="content" :style="{ transform: `translate3d(0, ${currentOffset}px, 0)` }">
            <div v-for="item in visibleData" :key="item.id" :style="{ height: itemSize + 'px', '--height': itemSize }"
                class="list-item">
                {{ item.value }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BaseVisualList',
    components: {
    },
    data() {
        return {
            listData: [],
            itemSize: 50, // 每项高度
            screenHeight: 0, // 可视区域高度
            start: 0,        // 起始索引
            end: null,       // 结束索引
            currentOffset: 0, // 当前偏移量
        }
    },
    mounted() {
        for (let i = 1; i <= 1000; i++) {
            this.listData.push({ id: i, value: '字符内容' + i })
        }
        this.screenHeight = this.$el.clientHeight
        this.start = 0
        this.end = this.start + this.visibleCount

        this.$refs.virtualList.addEventListener('scroll', event => this.scrollEvent(event.target))
    },
    computed: {
        // 总高度
        listHeight() {
            return this.listData.length * this.itemSize
        },
        // 可以看到的项数
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize)
        },
        visibleData() {
            return this.listData.slice(this.start, this.end)
        }
    },
    methods: {
        scrollEvent(target) {
            // 当前滚动位置
            let scrollTop = target.scrollTop;
            // 此时的开始索引
            this.start = ~~(scrollTop / this.itemSize); // 双波浪线对结果进行取整操作，得到最接近且小于等于该结果的整数值
            // 此时的结束索引
            this.end = this.start + this.visibleCount;
            // 此时的偏移量
            // 减去(scrollTop % this.itemSize)是为了防止滚动到最后的时候发生抖动
            // 例如我滚一次是滚动100px, 此时已经显示到1000中的999项了, 再滚一次, 那么此时只需要偏移60px, 如果还是偏移100px, 那么就会往下挤40px
            // 这样就会导致可以一直往下滚
            this.currentOffset = scrollTop;
        }
    },
}
</script>

<style>
.container {
    position: relative;
    height: 80vh;
    overflow: auto;
}

.phantom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}

.content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    text-align: center;
}

.list-item {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #999;
    line-height: calc(var(--height) * 1px - 22px);
}
</style>
