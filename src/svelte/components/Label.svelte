<script lang="ts">
  import { library, icon } from '@fortawesome/fontawesome-svg-core';
  import { faXmark } from '@fortawesome/free-solid-svg-icons';
  library.add(faXmark);
  export let rounded: boolean = false;
  export let type: 'info' | 'success' | 'warning' | 'danger' = 'info';
  export let text: string = '';
  export let dismissable: boolean = false;
  let colorClass: Record<string, string> = {
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger'
  };
  let dismissIcon = icon(faXmark).html;
  let nodeRef: HTMLDivElement | undefined;
</script>

<div
  class="label {rounded ? 'rounded' : ''} {colorClass[type]} w-fit p-0_5"
  bind:this={nodeRef}
>
  <div class="label-body">
    <div class="label-text break-word">
      {#if dismissable}
        <span
          class="dismiss-label cursor-pointer"
          on:click={() => {
            if (
              nodeRef !== undefined &&
              nodeRef !== null &&
              nodeRef.parentNode !== null
            ) {
              nodeRef.parentNode.removeChild(nodeRef);
            }
          }}
          on:keyup={e => {
            if (e.code === 'Enter') {
              if (
                nodeRef !== undefined &&
                nodeRef !== null &&
                nodeRef.parentNode !== null
              ) {
                nodeRef.parentNode.removeChild(nodeRef);
              }
            }
          }}
        >
          {@html dismissIcon}
        </span>
      {/if}
      {@html text}
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../scss/components/label.scss';
</style>
