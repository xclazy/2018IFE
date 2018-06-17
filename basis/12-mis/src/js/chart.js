/*
* 图表模块
* 用图表的形式展现数据
*/

// 图表
class chart {
  constructor(data, container) {
    if (!container) return false;
    // 图表宽度
    this.width = 600;
    // 图表高度
    this.height = 200;
    // 坐标轴的偏移，两边留白
    this.axisPadding = 25;
    // Y轴最大高度
    this.axisMaxY = this.height - this.axisPadding * 1.5;
    // X轴最大宽度
    this.axisMaxX = this.width - this.axisPadding;
    // 柱子间隔
    this.barPadding = 10;
    // X轴数据量
    this.xDataLength = 12;
    // 柱子块宽度/canvas数据距离
    this.barWidth = (this.axisMaxX - (this.xDataLength * this.barPadding)) / this.xDataLength;
    // 坐标轴x的位置
    this.axisTextX = [];
    for (let i = 0; i < this.xDataLength; i += 1) {
      this.axisTextX.push((i + 1) * (this.barWidth + this.barPadding) + this.axisPadding - this.barWidth / 2);
    }
    // 重要高亮色
    this.colorMain = ['#FF8BAC', '#E8C573', '#91FF8B', '#4F96E8', '#FF84ED', '#A1C2FF', '#AF73E8', '#E8A073', '#FFE27E'];
    // 坐标轴颜色
    this.colorAxis = '#333';
    // 坐标轴字体大小
    this.fontSize = 12;
    // 添加到DOM页面上
    container.innerHTML = `<canvas id="canvas" width="${this.width}" height="${this.height}"></canvas> \
    <svg id="svg" viexBox="0, 0, ${this.width}, ${this.height}"></svg>`;
    // svg
    this.svg = document.getElementById('svg');
    // canvas
    this.canvas = document.getElementById('canvas');
    // 渲染canvas坐标轴
    this.canvasInit();
    if (data) this.setData(data);
  }
  setData(data) {
    if (!data || data === this.arr || !data.length) return false;
    // 数组长度
    this.arrLength = data.length;
    // 数据最大值, 判断一条/多条数据
    if (typeof data[0] != 'number') {
      const arr = [];
      const length = data.length;
      for (let i = 0; i < length; i += 1) {
        arr.push(...data[i]);
      }
      this.arrMax = Math.max(...arr);
    } else {
      this.arrMax = Math.max(...data);
    }

    // 计算坐标轴
    const maxY = this.axisMaxY;
    const arrMax = this.arrMax;
    const width = this.barPadding + this.barWidth; // 每一块数据的距离
    const padding = this.axisPadding;
    const barWidth = this.barWidth;
    const colorMain = this.colorMain;
    const axisTextX = this.axisTextX;
    this.coordinate = [];
    // 数据坐标
    for (let i = 0; i <  this.arrLength; i += 1) {
      if (typeof data[i] != 'number') {
        const child = data[i];
        const childLength = child.length;
        const arr = []
        for (let j = 0; j < childLength; j += 1) {
          // 数据高度
          const y = maxY - (child[j] / arrMax) * (maxY - padding / 2);
          const x = axisTextX[j];
          arr.push({
            x,
            y,
            color: colorMain[i]
          });
        }
        this.coordinate.push(arr);
      } else {
        // 数据高度
        const y = maxY - (data[i] / arrMax) * (maxY - padding / 2);
        const x = axisTextX[i];
        this.coordinate.push({
          x,
          y,
        });
      }
    }
    // 渲染svg
    this.buildSvg(data);
    this.clearCanvas();
    this.buildCanvasLine(this.coordinate, data);
  }
  // canvas坐标轴/初始化
  canvasInit() {
    if (!this.canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    const padding = this.axisPadding;
    const maxY = this.axisMaxY + padding / 2;
    const maxX = this.width;
    
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    // Y轴
    ctx.moveTo(padding, maxY);
    ctx.lineTo(padding, 0);
    // X轴
    ctx.moveTo(padding, maxY);
    ctx.lineTo(maxX, maxY);
    ctx.stroke();
    ctx.closePath();

    ctx.font = `${this.fontSize}px`;
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('0', padding / 2, maxY);
    // x轴坐标文字
    const axisTextX = this.axisTextX;
    const length = axisTextX.length;
    for (let i = 0; i < length; i += 1) {
      ctx.fillText(`${i + 1}月`, axisTextX[i], maxY);
    }
    ctx.strokeStyle = this.colorMain[0];
    ctx.fillStyle = this.colorMain[0];
  }
  clearCanvas() {
    if (!this.canvas.getContext) return false;
    const ctx = canvas.getContext('2d');

    // 清空旧的
    const padding = this.axisPadding;
    ctx.clearRect(padding + 1, 0, this.axisMaxX, this.axisMaxY + padding / 2 - 1);
    ctx.clearRect(0, 0, padding - 5, padding / 2 + this.fontSize);
  }
  // 画canvas折线
  buildCanvasLine(coordinate, arr, color) {
    if (!this.canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    const padding = this.axisPadding;

    const length = coordinate.length;

    // Y最大值
    ctx.save();
    ctx.fillStyle = this.colorAxis;
    ctx.textAlign = 'end';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.arrMax, padding - 5, padding / 2);
    ctx.restore();

    ctx.save();
    for (let i = 0; i < length; i += 1) {
      if (Object.prototype.toString.call(coordinate[i]) === '[object Array]') {
        const child = coordinate[i];
        const childLength = child.length;
        for (let j = 0; j < childLength; j += 1) {
          const item = child[j];
          const color = item.color;
          if (color) {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
          }
          // 画圆点
          ctx.beginPath();
          ctx.arc(item.x, item.y, 2, 0, 2 * Math.PI);
          ctx.fill();
          // 连线
          if (j - 1 >= 0) ctx.moveTo(child[j - 1].x, child[j - 1].y);
          ctx.lineTo(item.x, item.y);
          ctx.stroke();
          ctx.closePath();
        }
      } else {
        const item = coordinate[i];
        // 画圆点
        ctx.beginPath();
        ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        // 连线
        if (i - 1 >= 0) ctx.moveTo(coordinate[i - 1].x, coordinate[i - 1].y);
        ctx.lineTo(item.x, item.y);
        ctx.stroke();
        // 数字文案
        ctx.fillText(arr[i], item.x, item.y + 5);
        ctx.closePath();
      }
    }
    ctx.restore();
  }
  // 生成SVG
  buildSvg(data) {
    // 柱状图
    const bar = this.buildSvgBar();
    // 坐标轴
    const axis = this.buildSvgAxis(data);
    this.svg.innerHTML = bar + axis;
  }
  // 生成柱子
  buildSvgBar() {
    const axisMaxY = this.axisMaxY;
    const barWidth = this.barWidth;
    const padding = this.axisPadding;
    const colorMain = this.colorMain[0];

    // 坐标组
    const coordinate = this.coordinate;
    const length = coordinate.length;
    const rect = [];
    // 遍历生成柱状图
    for (let i = 0; i < length; i += 1) {
      if (Object.prototype.toString.call(coordinate[i]) === '[object Array]') {
        const child = coordinate[i];
        const childLength = child.length;
        const childBarX = barWidth / length * i;
        for (let j = 0; j < childLength; j += 1) {
          rect.push(`<rect x="${child[j].x + childBarX - barWidth / 2}" y="${child[j].y}" width="${barWidth / length}" height="${axisMaxY - child[j].y + padding / 2}" fill="${child[j].color || colorMain}"/>`);
        }
      } else {
        rect.push(`<rect x="${coordinate[i].x - barWidth / 2}" y="${coordinate[i].y}" width="${barWidth}" height="${axisMaxY - coordinate[i].y + padding / 2}" fill="${coordinate[i].color || colorMain}"/>`);
      }
    }
    return rect.join('');
  }
  // 生成坐标轴
  buildSvgAxis() {
    const axis = [];
    const axisPadding = this.axisPadding;
    const maxY = this.axisMaxY + axisPadding / 2;
    const colorAxis = this.colorAxis;
    const width = this.width;
    const height = this.height;
    const fontSize = this.fontSize;
    const barPadding = this.barPadding;
    // x轴
    axis.push(`<line x1="${axisPadding}" y1="${maxY}" x2="${width}" y2="${maxY}" stroke="${colorAxis}" stroke-width="1"/>`); 
    // y轴
    axis.push(`<line x1="${axisPadding}" y1="${maxY}" x2="${axisPadding}" y2="0" stroke="${colorAxis}" stroke-width="1"/>`);
    // 原点坐标
    axis.push(`<text x="${axisPadding}" y="${height - fontSize}" text-anchor="end" fill="${colorAxis}" style="font-size: ${fontSize}px">0</text>`);
    // y轴文字
    axis.push(`<text x="${axisPadding - 5}" y="${axisPadding / 2 + fontSize / 2}" text-anchor="end" fill="${colorAxis}" style="font-size: ${fontSize}px">${this.arrMax}</text>`);
    // x轴文字
    const axisTextX = this.axisTextX;
    const length = axisTextX.length;
    const barWidth = this.barWidth;
    for (let i = 0; i < length; i += 1) {
      axis.push(`<text x="${axisTextX[i]}" y="${height - fontSize}" fill=${colorAxis}" text-anchor="middle"  style="font-size: ${fontSize}px">${i + 1}月</text>`);
    }
    return axis.join('');
  }
  // 生成图表
  buildChart() {
    let chartHtml = this.buildSvg();
    if (!this.ctx) chartHtml += this.canvas;
    return chartHtml;
  }
}
export default chart;