/*
* 图表模块
* 用图表的形式展现数据
*/

// 图表
class chart {
  constructor(data, container) {
    if (!container) return false;
    // 图表宽度
    this.width = 400;
    // 图表高度
    this.height = 200;
    // 坐标轴的偏移，两边留白
    this.axisPadding = 15;
    // Y轴最大高度
    this.axisMaxY = this.height - this.axisPadding;
    // X轴最大宽度
    this.axisMaxX = this.width - this.axisPadding;
    // 柱子间隔
    this.barPadding = 10;
    // 重要高亮色
    this.colorMain = '#FF8BAC';
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
    if (!data) return false;
    // 数据
    this.arr = data;
    // 数据最大值
    this.arrMax = Math.max(...data);
    // 数组长度
    this.arrLength = data.length;
    // 柱子宽度
    this.barWidth = (this.width - this.axisPadding - (this.arrLength *  this.barPadding)) / this.arrLength;
    // 渲染svg
    this.buildSvg();
    this.buildCanvas();
  }
  // 坐标轴初始化
  canvasInit() {
    if (!this.canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    const padding = this.axisPadding;
    const maxY = this.axisMaxY;
    const maxX = this.width;

    ctx.save();
    ctx.strokeStyle  = this.colorAxis;
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
    ctx.textBaseline = 'top';
    ctx.fillText('0', padding / 2, maxY);
    ctx.restore();
  }
  buildCanvas() {
    if (!this.canvas.getContext) return false;
    const ctx = canvas.getContext('2d');

  }
  // 生成SVG
  buildSvg() {
    // 柱状图
    const bar = this.buildSvgBar();
    // 坐标轴
    const axis = this.buildSvgAxis();
    this.svg.innerHTML = bar + axis;
  }
  // 生成柱子
  buildSvgBar() {
    if (!this.arr || !this.arrLength) return '';
    const arr = this.arr;
    const length = this.arrLength;
    const max = this.arrMax;
    const heightMax = this.axisMaxY;
    const barWidth = this.barWidth;
    const barPadding = this.barPadding;
    const axisPadding = this.axisPadding;
    const colorMain = this.colorMain;
    // 柱子宽度
    const rect = [];
    // 遍历生成柱状图
    for (let i = 0; i < length; i += 1) {
      // 柱子高度
      const height = (arr[i] / max) * heightMax;
      rect.push(`<rect x="${(i * (barWidth + barPadding)) + barPadding + axisPadding}" y="${heightMax - height}" width="${barWidth}" height="${height}" fill="${colorMain}"/>`);
    }
    return rect.join('');
  }
  // 生成坐标轴
  buildSvgAxis() {
    const axis = [];
    const axisPadding = this.axisPadding;
    const axisMaxY = this.axisMaxY;
    const colorAxis = this.colorAxis;
    const width = this.width;
    const height = this.height;
    const fontSize = this.fontSize;
    const barPadding = this.barPadding;
    // x轴
    axis.push(`<line x1="${axisPadding}" y1="${axisMaxY}" x2="${width}" y2="${axisMaxY}" stroke="${colorAxis}" stroke-width="1"/>`); 
    // y轴
    axis.push(`<line x1="${axisPadding}" y1="${axisMaxY}" x2="${axisPadding}" y2="0" stroke="${colorAxis}" stroke-width="1"/>`);
    // 原点坐标
    axis.push(`<text x="${axisPadding / 2}" y="${height}" text-anchor="end" fill="${colorAxis}" style="font-size: ${fontSize}px">0</text>`);
    // y轴文字
    axis.push(`<text x="${axisPadding / 2}" y="12" text-anchor="end" fill="${colorAxis}" style="font-size: ${fontSize}px">${this.arrMax}</text>`);
    // x轴文字
    const length = this.arrLength;
    for (let i = 0; i < length; i += 1) {
      axis.push(`<text x="${(i * (this.barWidth + barPadding)) + barPadding + axisPadding}" y="${height}" fill=${colorAxis}" style="font-size: ${fontSize}px">${i + 1}月</text>`);
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