/*\
title: addon/sevenday.js
module-type: echarts-component
type: application/javascript
description: seven
\*/

// TODO: 简化时间的处理
// TODO: 指定线的颜色, 区域的颜色
// @description: echarts 几乎支持每一处的样式设置, 这里仅根据需要设置必要的样式
const getData = (date, type = 'created') =>
  $tw.wiki.filterTiddlers(`[sameday:${type}[${date}]!is[system]!has[draft.of]]`)
    .length;

function parsesixDate(dateString) {
  const year = parseInt(dateString.substr(0, 4));
  const month = parseInt(dateString.substr(4, 2)) - 1; // 月份从0开始，需要减1
  const day = parseInt(dateString.substr(6, 2));
  const realDate = new Date(year, month, day);
  //.toLocaleDateString();
  return realDate;
}

function getSevenDaysBefore(dateString, daysLength = 7) {
  const currentDate = dateString ? parsesixDate(dateString) : new Date();

  const sevenDays = [];

  for (let i = 0; i < daysLength; i++) {
    // 获取当前日期的年、月、日
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const day = currentDate.getDate();

    // 将年、月、日格式化成字符串，并添加到数组
    const dateString = `${year}${month < 10 ? '0' : ''}${month}${
      day < 10 ? '0' : ''
    }${day}`;
    sevenDays.unshift(dateString); // 使用unshift方法将日期添加到数组头部

    // 将当前日期减一天，以便生成前一天的日期
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return sevenDays;
}

const Sevendays = {
  onUpdate(myChart, _state, addonAttributes) {
    const {
      days,
      date,
      title: text = '最近文章动态',
      subtitle: subtext = '',
      disableClick = 'no',
      // smooth = 'true',
    } = addonAttributes;

    const sevendays = getSevenDaysBefore(date, days);

    // TODO: 封装成函数 https://echarts.apache.org/examples/en/editor.html?c=bump-chart
    const createdData = [];
    const modifiedData = [];

    sevendays.forEach((date) => createdData.push(getData(date)));
    sevendays.forEach((date) => modifiedData.push(getData(date, 'modified')));

    const option = {
      title: {
        text,
        subtext,
        left: 'center',
        top: 'bottom',
      },
      legend: {
        data: ['created', 'modified'],
      },
      toolbox: {
        feature: {
          restore: {},
        },
      },
      tooltip: {
        // item, axis
        trigger: 'item',
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985',
        //   },
        // },
        formatter: function (params) {
          const { name: date, value: count, seriesName } = params;
          const realDate = parsesixDate(date).toLocaleDateString();
          if (seriesName === 'created') {
            return count
              ? `${realDate} 新增了 ${count} 篇文章`
              : `${realDate} 没有新增文章`;
          } else {
            return count
              ? `${realDate} 更新了 ${count} 篇文章`
              : `${realDate} 没有文章更新`;
          }
        },
      },
      // color: [''],
      xAxis: {
        boundaryGap: true, // 是否在数据点两侧留白，
        type: 'category',
        data: sevendays,
        name: '日期',
      },
      yAxis: {
        type: 'value',
        name: '文章数量',
      },
      animationDuration: 2000,
      series: [
        {
          name: 'created',
          data: createdData,
          type: 'line',
          showSymbol: false,
          symbolSize: 0, // 数据点大小
          stack: 'Total',
          lineStyle: {
            // 折线宽度
            width: 0,
            // color: 'purple'
          },
          endLabel: {
            show: true,
            formatter: '{a}',
            distance: 20,
          },
          // 区域颜色
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)',
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              scale: 1.5,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          smooth: true,
        },
        {
          name: 'modified',
          data: modifiedData,
          lineStyle: {
            width: 0,
          },
          symbolSize: 0,
          stack: 'Total',
          type: 'line',
          showSymbol: false,
          endLabel: {
            show: true,
            formatter: '{a}',
            distance: 20,
          },
          areaStyle: {
            opacity: 0.9,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)',
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              // color: '',
              scale: 1.25,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          smooth: true,
        },
      ],
    };

    myChart.setOption(option);
    myChart.on('dblclick', 'series', function (params) {
      const { name: date, value: count, seriesName } = params;
      const goto = new $tw.Story();
      const filter = `[sameday:${seriesName}[${date}]!is[system]!has[draft.of]]`;

      if (!count) return;
      $tw.rootWidget.invokeActionString(
        '<$action-setfield $tiddler="$:/temp/advancedsearch" text="""' +
          filter +
          '"""/><$action-setfield $tiddler="$:/temp/advancedsearch/input" text="""' +
          filter +
          '"""/><$action-setfield $tiddler="$:/temp/advancedsearch/refresh" text="yes"/><$action-setfield $tiddler="$:/state/tab--1498284803" text="$:/core/ui/AdvancedSearch/Filter"/>',
      );
      goto.navigateTiddler('$:/AdvancedSearch');
    });
  },
  shouldUpdate() {
    return false;
  },
};

module.exports = Sevendays;
