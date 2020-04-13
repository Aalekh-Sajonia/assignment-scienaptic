import * as d3 from 'd3';

const url = "https://cors-anywhere.herokuapp.com/https://extendsclass.com/api/json-storage/bin/deeaabd";
const Margin = {TOP: 10, BOTTOM: 50, LEFT: 50, RIGHT: 10}

const Width = 800 - Margin.LEFT - Margin.RIGHT;
const Height = 500 - Margin.TOP - Margin.BOTTOM;

export default class D3Chart {
     constructor(element,prop,data) {
         const svg = d3.select(element)
          .append("svg")
               .attr("width", Width + Margin.LEFT + Margin.RIGHT)
               .attr("height", Height + Margin.TOP + Margin.BOTTOM)  
          .append("g")
               .attr("transform", `translate(${Margin.LEFT}, ${Margin.TOP})`)

          d3.json(url).then(data => {
               const storeArr = data.map(ele => {
                    return {
                         type: ele.statType, 
                         item: ele.conceptName
                    }
               })
               
               let index = 2;
               index = storeArr.findIndex((ele) => {
                    return ele.item === prop.toUpperCase();
               })

               let type = storeArr[index].type;
               console.log(type);
               if(type === "categorical")
               {
                    type = "freqCount"
               }
               else
               {
                    type = "graph"
               }

               const arr = Object.keys(data[index][type]);
               const res = arr.map((ele) => {
                    return {
                         range: this.clean(ele),
                         val: data[index][type][ele]
                    }
               });
               console.log(res);

               const max = d3.max(res, d=> {
                    return d.val
               })

               const y = d3.scaleLinear()
                    .domain([d3.min(res, d => d.val) * .95,max])
                    .range([Height,0])

               const x = d3.scaleBand()
                    .domain(res.map(d => d.range))
                    .range([0,Width])
                    .padding(0.2)

               const rects = svg.selectAll("rect")
                    .data(res)
               
               const xAxisCall = d3.axisBottom(x)
               svg.append("g")
                    .attr("transform", `translate(0,${Height})`)
                    .call(xAxisCall)

               const yAxisCall = d3.axisLeft(y)
               svg.append("g").call(yAxisCall)

               svg.append("text")
                    .attr("x", Width / 2)
                    .attr("y", Height + 50)
                    .attr("text-anchor", "middle")
                    .text("X axis")

               svg.append("text")
                    .attr("x", -(Height/2))
                    .attr("y", -30)
                    .attr("text-anchor", "middle")
                    .text("Y axis")
                    .attr("transform", "rotate(-90)")

               rects.enter().append("rect")
                    .attr("x", d => x(d.range))
                    .attr("y", d => y(d.val))
                    .attr("width",x.bandwidth)
                    .attr("height", d => Height - y(d.val))
                    .attr("fill", "grey")
          })
     }
     clean(ele) {
          if(ele.length > 9 && ele.search('-') !== -1)
          {
             let split = ele.split('-');
             split[0] = Number(split[0]).toFixed(2);
             split[1] = Number(split[1]).toFixed(2);
             return `${split[0]}-${split[1]}`;
          }
          return ele;
     }

}