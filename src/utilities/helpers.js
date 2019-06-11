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

export function drawLabel(ctx, label, x, y ) {
  // console.log("Drawing Bar");
  ctx.save();
  ctx.fillStyle = "#333";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y);
  ctx.restore();
}

export function barChart(options) {
  // console.log(options);

  // options = options;
  let canvas = options.canvas;
  let ctx = canvas.getContext("2d");
  let colors = options.data.map(obj => {
    return obj.color
  })

  return () => {
    // console.log("Drawing Chart!");
    let maxValue = 0;
    for (let categ in options.data){
      // console.log(options.data[categ]);
      maxValue = Math.max(maxValue,options.data[categ].value);
    }
    let canvasActualHeight = canvas.height - options.padding * 2;
    let canvasActualWidth = canvas.width - options.padding * 2;

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

    //drawing the bars
    let barIndex = 0;
    let numberOfBars = options.data.length;
    let barSize = (canvasActualWidth)/numberOfBars;

    for (let categ in options.data){
      let val = options.data[categ].value;
      let barHeight = Math.round( canvasActualHeight * val/maxValue) ;
      drawBar(
          ctx,
          options.padding + barIndex * barSize,
          canvas.height - barHeight - options.padding,
          barSize,
          barHeight,
          colors[barIndex%colors.length]
      );
      barIndex++;
    }

    // drawing the x-axis labels
    barIndex = 0;
    numberOfBars = options.data.length;
    barSize = (canvasActualWidth)/numberOfBars;

    for (let categ in options.data){
      let val = options.data[categ].value;
      let label = options.data[categ].label;
      let barHeight = Math.round( canvasActualHeight * val/maxValue) ;
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
