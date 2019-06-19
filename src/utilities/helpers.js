/* eslint-disable */

export function drawLine(ctx, startX, startY, endX, endY, color) {
  // console.log("Drawing Line");
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

export function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color ) {
  // console.log("Drawing Bar");
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

function _drawTooltip(value) {
  // Remove existing tooltip if any
  let prev_tooltip = document.getElementById("bar-tooltip")
  if(prev_tooltip) prev_tooltip.remove();
  // drawing tooltips
  // console.log("Hovering over: ", event);
  let tooltip = document.createElement("div");
  tooltip.setAttribute("id", "bar-tooltip")
  tooltip.style.position = "fixed";
  tooltip.style.backgroundColor = "#fff";
  tooltip.style.padding = "10px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.display = "block";
  tooltip.innerHTML = value;
  document.body.appendChild(tooltip)
  tooltip.style.left = event.clientX + 10 + "px";
  tooltip.style.top = event.clientY - 40 + "px";
  // console.log("Tooltip: ", tooltip);
}

export function drawLabel(ctx, label, x, y ) {
  // console.log("Drawing Bar");
  ctx.save();
  ctx.fillStyle = "#333";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y);
  ctx.restore();
}

function _drawSvgBars(options) {
  // clear the previous svg if any
  let svg_prev = document.getElementById("svg-group");
  if(svg_prev)  svg_prev.remove();
  let canvas_parent = options.parent
  // console.log(canvas_parent);
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "svg-group");
  svg.setAttribute("width", "400px");
  svg.setAttribute("height", "400px");
  svg.setAttribute("style", "position: absolute; top: " + (canvas_parent.getBoundingClientRect().top + options.padding * 0.92) + "px; left: " + canvas_parent.getBoundingClientRect().left + "px;");
  canvas_parent.appendChild(svg);
  let barIndex = 0;
  let numberOfBars = options.data.length;
  let canvasActualWidth = options.canvas.width - options.padding * 2;
  let canvasActualHeight = options.canvas.height - options.padding * 2;
  let barSize = (canvasActualWidth)/numberOfBars;
  let maxValue = 0;
  for (let categ in options.data){
    maxValue = Math.max(maxValue,options.data[categ].value);
  }
  for (let categ in options.data){
    let barHeight = Math.round( canvasActualHeight * options.data[categ].value/maxValue) ;
    let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttributeNS(null, 'x', options.padding + barIndex * barSize);
    rect.setAttributeNS(null, 'y', options.canvas.height - barHeight - options.padding);
    rect.setAttributeNS(null, 'height', barHeight);
    rect.setAttributeNS(null, 'width', barSize);
    rect.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
    rect.setAttributeNS(null, 'fill', options.data[categ].color);
    // rect.setAttributeNS(null, 'fill', 'transparent');
    rect.addEventListener("mousemove", () => {
      let val = options.data[categ].value;
      _drawTooltip(val);
    });
    rect.addEventListener("mouseout", (e) => {
      // console.log("Leaving Rect: ", e);
      document.getElementById("bar-tooltip").remove();
    });
    document.getElementById('svg-group').appendChild(rect);
    barIndex++;
  }
}

export function barChart(options) {
  let canvas = options.canvas;
  let ctx = canvas.getContext("2d");
  let canvasActualHeight = canvas.height - options.padding * 2;
  let canvasActualWidth = canvas.width - options.padding * 2;
  if(!options.data) {
    let label = "No Data to Display Graph";
    return () => {
      drawLabel(
        ctx,
        label,
        canvasActualWidth / 2,
        canvasActualHeight / 2
      )
    }
  } else {
    _drawSvgBars(options);
    document.body.onresize = () => {
      // console.log("window resized");
      _drawSvgBars(options);
    }

    return () => {
      // console.log("Drawing Chart!");
      let maxValue = 0;
      for (let categ in options.data){
        // console.log(options.data[categ]);
        maxValue = Math.max(maxValue,options.data[categ].value);
      }

      //drawing the grid lines
      let gridValue = 0;
      while (gridValue <= maxValue){
          let gridY = canvasActualHeight * (1 - gridValue/maxValue) + options.padding;
          drawLine(
              ctx,
              0,
              gridY,
              canvas.width,
              gridY,
              options.gridColor
          );

          //writing grid markers
          ctx.save();
          ctx.fillStyle = options.gridColor;
          ctx.font = "bold 10px Arial";
          ctx.fillText(gridValue, 10,gridY - 2);
          ctx.restore();

          gridValue+=options.gridScale;
      }

      // //drawing the bars
      // let barIndex = 0;
      // let numberOfBars = options.data.length;
      // let barSize = (canvasActualWidth)/numberOfBars;

      // for (let categ in options.data){
      //   let val = options.data[categ].value;
      //   let barHeight = Math.round( canvasActualHeight * val/maxValue) ;
      //   drawBar(
      //       ctx,
      //       options.padding + barIndex * barSize,
      //       canvas.height - barHeight - options.padding,
      //       barSize,
      //       barHeight,
      //       colors[barIndex%colors.length]
      //   );
      //   barIndex++;
      // }

      // // drawing the x-axis labels
      // barIndex = 0;
      // numberOfBars = options.data.length;
      // barSize = (canvasActualWidth)/numberOfBars;
      let barIndex = 0;
      let numberOfBars = options.data.length;
      let barSize = (canvasActualWidth)/numberOfBars;

      for (let categ in options.data){
        let val = options.data[categ].value;
        let label = options.data[categ].label;
        drawLabel(
          ctx,
          label,
          options.padding + barIndex * barSize + (barSize) / 2,
          canvasActualHeight + 70
        )
        barIndex++;
      }
    }
  }
}
