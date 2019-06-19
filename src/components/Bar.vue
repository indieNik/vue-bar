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
  methods: {
    drawChart: function( graphData ) {
      let el = this.$el;
      let canvas = el.getElementsByTagName("canvas")[0];
      let graphObj = {};
      let drawBarChart = null;
      if( graphData ) {
        canvas.width = graphData.meta.width;
        canvas.height = graphData.meta.height;
        graphObj = {
          canvas:     canvas,
          padding:    graphData.meta.padding,
          gridScale:  graphData.meta.gridScale,
          gridColor:  graphData.meta.gridColor,
          data:       graphData.data,
        }
      } else {
        canvas.width = 400;
        canvas.height = 400;
        graphObj = {
          canvas:     canvas,
          padding:    40,
          gridScale:  5,
          gridColor:  "#eee",
          data:       null,
        }
      }
      drawBarChart = Utils.barChart( graphObj )
      drawBarChart();
    }
  },
  created: function() {
    // console.log("this after created:", this);
  },
  mounted: function() {
    // Initial Render
    this.drawChart( this.graphData );
  },

  updated: function() {
    // Especially for Web Components' initial render
    this.drawChart( this.graphData );
  }
};
</script>

<style scoped>
  canvas{
    width:100%;
    height:100%;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
</style>
