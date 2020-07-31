<template>
  <div>
    <b-table
      striped
      hover
      selectable
      outlined
      fixed
      :select-mode="selectMode"
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
      sticky-header
      head-variant="dark"
    ></b-table>
  </div>
</template>

<script>
export default {
  props: ["items", "fields"],
  data() {
    return {
      selectMode: "single",
    };
  },
  methods: {
    onRowSelected(items) {
      console.log(items);
    },
  },
};
</script>