<template>
  <div>
    <b-table
      striped
      hover
      selectable
      outlined
      fixed="true"
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
      alert(JSON.stringify(items));
    },
  },
};
</script>