<script>
import BasicContainer from "./Misc/BasicContainer.vue";
export default {
  name: "CompetitionTable",
  props: ["year", "items"],
  components: { BasicContainer },
  computed: {
    arr() {
      const tempArr = [];

      this.items.value.forEach((element) => {
        const points = this.toNumberTypes(
          this.splitByComa(element.points.value)
        );
        const weights = this.toNumberTypes(
          this.splitByComa(element.weights.value)
        );
        const pointsSum = points.reduce((pV, cV) => pV + cV);
        const weightsSum = weights.reduce((pV, cV) => pV + cV);

        tempArr.push({
          name: element.name.value,
          dates: this.splitByComa(element.dates.value),
          points: points,
          pointsSum: pointsSum,
          weights: weights,
          weightsSum: weightsSum,
        });
      });

      tempArr.sort((a, b) => {
        if (a.pointsSum < b.pointsSum) return -1;
        if (a.pointsSum > b.pointsSum) return 1;
        if (a.pointsSum === b.pointsSum) return b.weightsSum - a.weightsSum;
      });

      return tempArr;
    },
  },
  methods: {
    splitByComa(string) {
      return string.split(",");
    },
    toNumberTypes(arr) {
      return arr.map((el) => Number(el));
    },
  },
};
</script>

<template>
  <basic-container>
    <div class="bg-white rounded shadow mb-8 p-2 select-none">
      <div
        v-if="arr.length > 2"
        class="
          flex flex-col
          gap-2
          mb-8
          justify-center
          items-center
          text-center text-white
          font-semibold
        "
      >
        <span class="text-sm font-light text-slate-500"
          >Najlepsi w {{ year.value }} roku:</span
        >
        <h1 class="block bg-yellow-500 rounded p-4 w-[90%]">
          {{ arr[0].name }} z sumą punktów: {{arr[0].pointsSum}}, oraz wagą: {{arr[0].weightsSum}}g.
        </h1>
        <h2 class="block bg-slate-400 rounded p-4 w-[75%]">
          {{ arr[1].name }} z sumą punktów: {{arr[1].pointsSum}}, oraz wagą: {{arr[1].weightsSum}}g.
        </h2>
        <h3 class="block bg-amber-900 rounded p-4 w-[60%]">
          {{ arr[2].name }} z sumą punktów: {{arr[2].pointsSum}}, oraz wagą: {{arr[2].weightsSum}}g.
        </h3>
      </div>
      <div class="p-2 bg-slate-200 text-slate-600 text-center rounded">
        <p class="font-thin mb-4">Klasyfikacja w roku {{ year.value }}</p>
        <div
          class="
            grid
            grid-cols-[2rem,_repeat(3,_minmax(0,_1fr))]
            gap-2
            p-1
            text-slate-500
            font-Kanit
          "
        >
          <p>Lp.</p>
          <p>Imię i nazwisko</p>
          <p>Wyniki</p>
          <p>Suma</p>
        </div>
        <div class="bg-white rounded">
          <div
            v-for="(item, index) in arr"
            :key="'table-' + year + '-participant-' + index"
            class="
              grid
              grid-cols-[2rem,_repeat(3,_minmax(0,_1fr))]
              gap-2
              p-1
              text-slate-700
              font-medium font-Kanit
            "
          >
            <p
              class="p-2 rounded bg-slate-300 flex items-center justify-center"
            >
              {{ index + 1 }}
            </p>
            <p
              class="p-2 rounded bg-slate-300 flex items-center justify-center"
            >
              {{ item.name }}
            </p>
            <div>
              <div
                v-for="(value, i) in item.points"
                :key="'results-' + index + i"
                class="
                  relative
                  flex
                  justify-around
                  gap-2
                  bg-slate-300
                  rounded
                  mb-1
                  last:mb-0
                  p-1
                  overflow-hidden
                  cursor-pointer
                  group
                "
              >
                <p
                  class="
                    flex
                    items-center
                    justify-center
                    absolute
                    h-full
                    w-full
                    top-0
                    -left-full
                    group-hover:left-0
                    bg-slate-200
                    transition-all
                    duration-500
                  "
                >
                  {{ item.dates[i] }}
                </p>
                <p>{{ item.points[i] }}pkt</p>
                <p>{{ item.weights[i] }}g</p>
              </div>
            </div>
            <div
              class="
                flex
                justify-around
                items-center
                gap-2
                bg-slate-300
                rounded
                p-1
              "
            >
              <p>{{ item.pointsSum }}pkt</p>
              <p>{{ item.weightsSum }}g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </basic-container>
</template>
