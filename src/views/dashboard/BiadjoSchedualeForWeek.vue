<template>
  <e-charts autoresize :options="option" ref="bar" auto-resize />
</template>

<script>
/* eslint-disable */
import moduleDashboard from "@/store/clientDashboard/moduleDashboard.js";

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts-gl";
import moment from "moment";

export default {
  data() {
    return {
      duration: 5,
      option: {
        title: {
          text: this.$t("BiadjoSchedualeForWeek"),
          left: this.$vs.rtl ? "right" : "left",
          textStyle: {
            fontFamily: "Cairo"
          }
        },
        toolbox: {
          left: this.$vs.rtl ? "left" : "right",
          feature: {
            magicType: {
              show: true,
              title: this.$t("ChangeType"),
              type: ["line", "bar"]
            },
            restore: { show: true, title: this.$t("Reset") },
            saveAsImage: {
              title: this.$t("Save"),
              type: "png",
              name:
                this.$t("BiadjoSchedualeForWeek") +
                " " +
                moment(new Date()).format("YYYY-MM-DD hh:mm")
            }
          }
        },
        color: ["#27ABBE"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              // rotate: 45,
              fontWeight: "bold",
              fontSize: 14
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  components: {
    ECharts
  },
  methods: {
    BiadjoSchedualeForWeek() {
      this.option.series[0].data = [];
      this.option.xAxis[0].data = [];
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var Obj = {};
      Obj.CompanyId = this.userInfo.CompanyId;
      Obj.UserId = this.userInfo.Id;
      this.$store
        .dispatch("Dashboard/BiadjoSchedualeForWeek", Obj)
        .then(res => {
          res.data.forEach(element => {
            this.option.series[0].data.push(element.Value);
            this.option.xAxis[0].data.push(element.Key);
          });
        });
    },
    DashboardReloading() {
      setInterval(() => {
        this.BiadjoSchedualeForWeek();
      }, this.duration * 1000 * 60);
    }
  },
  created() {
    if (!moduleDashboard.isRegistered) {
      this.$store.registerModule("Dashboard", moduleDashboard);
      moduleDashboard.isRegistered = true;
    }
    this.BiadjoSchedualeForWeek();
    this.DashboardReloading();
  }
};
</script>
