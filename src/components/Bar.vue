<template>
  <div>
    <h1>
      Vue Bar Chart
    </h1>
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
/* eslint-disable */
import * as Utils from "../utilities/helpers";

export default {
  name: "Bar",
  props: ["graphData"],
  data () {
    return {
      id: null
    }
  },
  created: function() {
    // console.log("this after created:", this);
  },
  mounted: function() {
    // Initial Render
    let el = this.$el;
    let myCanvas = el.getElementsByTagName("canvas")[0];
    let myBarChart = null;

    if(this.graphData) {
      myCanvas.width = this.graphData.meta.width;
      myCanvas.height = this.graphData.meta.height;

      myBarChart = Utils.barChart({
        canvas:myCanvas,
        padding:  this.graphData.meta.padding,
        gridScale:  this.graphData.meta.gridScale,
        gridColor:  this.graphData.meta.gridColor,
        data: this.graphData.data,
      })
    } else {
      myCanvas.width = 400;
      myCanvas.height = 400;
      myBarChart = Utils.barChart({
        canvas:myCanvas,
        padding: 40,
        data: null,
      })
    }

    myBarChart();
  },

  updated: function() {
    // Especially for Web Components
    let el = this.$el;
    let myCanvas = el.getElementsByTagName("canvas")[0];
    
    myCanvas.width = this.graphData.meta.width;
    myCanvas.height = this.graphData.meta.height;

    let myBarChart = Utils.barChart({
      canvas:myCanvas,
        padding:  this.graphData.meta.padding,
        gridScale:  this.graphData.meta.gridScale,
        gridColor:  this.graphData.meta.gridColor,
        data: this.graphData.data,
    })

    myBarChart();
  }
};
</script>

<style scoped>
  canvas{
    width:100%;
    height:100%;
  }
</style>
