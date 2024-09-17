<script setup>
import { getRadarChartConfig } from "@core/libs/apex-chart/apexCharConfig";
import { useTheme } from "vuetify";

const vuetifyTheme = useTheme();

const series = [
  {
    name: "iPhone 12",
    data: [41, 64, 81, 60, 42, 42, 33, 23],
  },
  {
    name: "Samsung s20",
    data: [65, 46, 42, 25, 58, 63, 76, 43],
  },
];

const chartConfig = computed(() =>
  getRadarChartConfig(vuetifyTheme.current.value)
);
</script>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
};
</script>

<template>
  <VueApexCharts
    type="radar"
    height="400"
    width="400"
    :options="chartConfig"
    :series="data"
  />
</template>
