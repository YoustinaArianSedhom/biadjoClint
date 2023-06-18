<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card class="FixedHeight">
        <BiadjoSchedualeForWeek />
      </vx-card>
    </div>

    <div class="vx-col w-full mb-base">
      <vx-card class="FixedHeight">
        <BiadjoSchedualePerStatusForToday />
      </vx-card>
    </div>
  </div>
</template>
<script>
import BiadjoSchedualeForWeek from "@/views/dashboard/BiadjoSchedualeForWeek";

import BiadjoSchedualePerStatusForToday from "@/views/dashboard/BiadjoSchedualePerStatusForToday";

export default {
  data() {
    return {};
  },
  components: {
    BiadjoSchedualeForWeek,

    BiadjoSchedualePerStatusForToday
  },
  created() {
    this.$vs.loading();
    setTimeout(() => {
      this.$vs.loading.close();
    }, 2000);
  }
};
</script>
<style>
.FixedHeight {
  height: 500px !important;
}
.HalfFixedHeight {
  height: 250px !important;
}
.ThirdFixedHeight {
  height: 280px !important;
}
</style>
