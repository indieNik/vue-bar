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
  props: ["graphData", "padding", "gridScale", "gridColor"],
  data () {
    return {
      id: null
    }
  },
  created: function() {
    this.id = this._uid // Generate Unique ID
  },
  mounted: function() {
    let myCanvas = document.getElementById(this.id);
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

<style lang="sass" scoped></style>
