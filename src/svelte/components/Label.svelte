<script lang="ts">
  export let rounded: boolean = false;
  export let type: 'info' | 'success' | 'warning' | 'danger' = 'info';
  export let text: string = '';
  let colorClass: Record<string, string> = {
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger'
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
  @import '../../scss/components/label.scss';
</style>
