<script>
  export let rounded = false;
  export let type = "info";
  export let text = "";
  let colorClass = {
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
</script>

<div class="label {rounded ? 'rounded' : ''} {colorClass[type]} w-fit p-0_5">
  <div class="label-body">
    <div class="label-text break-word">
      {@html text}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/components/label.scss";
</style>
