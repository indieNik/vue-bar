<template>
  <div id="app">
    <Bar v-bind:graphData="graphData" class="vue-bar-chart"/>
    <Bar v-bind:graphData="graphData3" class="vue-bar-chart"/>
  </div>
</template>

<script>
/* eslint-disable */
import Bar from "./components/Bar";
export default {
  name: "app",
  components: {
    Bar
  },
  data() {
    return {
      graphData: {
        meta: {
          width: 400,
          height: 400,
          padding: 40,
          gridScale:5,
          gridColor:"#eeeeee",
        },
        data: [
          {
            label: "Jan",
            value: 10,
            color: "#81717A"
          },
          {
            label: "Feb",
            value: 35,
            color: "#9D8CA1"
          },
          {
            label: "Mar",
            value: 40,
            color: "#9993B2"
          },
          {
            label: "Apr",
            value: 20,
            color: "#9993C2"
          },
          {
            label: "May",
            value: 60,
            color: "#A7ABDD"
          },
          {
            label: "Jun",
            value: 75,
            color: "#B4D4EE"
          }
        ]
      },

      graphData2: {
        meta: {
          width: 400,
          height: 400,
          padding: 40,
          gridScale: 2,
          gridColor:"#333",
        },
        data: [
          {
            label: "Tom",
            value: 5,
            color: "#81717A"
          },
          {
            label: "Dick",
            value: 5.7,
            color: "#9D8CA1"
          },
          {
            label: "Harry",
            value: 6.2,
            color: "#9993B2"
          }
        ]
      },

      graphData3: null
    };
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .vue-bar-chart {
    width: 40vw;
    height: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .vue-bar-chart {
    width: 100% !important;
    height: 100%;
    margin: inherit;
  }
}

@media only screen and (min-width: 600px) and (max-width: 768px) {
  .vue-bar-chart {
    width: 80vw !important;
  }
}
</style>
