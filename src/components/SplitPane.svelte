<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { clamp, isMobile } from "../helpers";

  const dispatch = createEventDispatcher();

  export let show = true;

  let pos = 50;
  let dragging = false;
  let left: number, width: number, height: number;

  left = width = height = 0;

  function measure(node: HTMLElement) {
    const refresh = () => {
      ({ left, width, height } = node.getBoundingClientRect());
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(node);
    refresh();

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function drag(node: HTMLElement, callback: (ev: PointerEvent) => void) {
    const down = (ev: PointerEvent) => {
      if (!ev.isPrimary) return;

      ev.preventDefault();
      dragging = true;

      const up = () => {
        dragging = false;
        window.removeEventListener("pointermove", callback, false);
        window.removeEventListener("pointerup", up, false);
      };

      window.addEventListener("pointermove", callback, false);
      window.addEventListener("pointerup", up, false);
    };

    node.addEventListener("pointerdown", down);

    return {
      destroy() {
        node.removeEventListener("pointerdown", down);
      },
    };
  }

  function move_divider(ev: PointerEvent) {
    const px = ev.clientX - left;
    pos = clamp((100 * px) / width, 0, 100);
    dispatch("change");
  }
</script>

<section style={show ? "" : "display: none"} use:measure>
  <div class="pane" style="width: {pos}%">
    <slot name="left" />
  </div>
  <div class="pane" style="width: {100 - pos}%">
    <slot name="right" />
  </div>
  <div
    class="divider"
    class:is-mobile={isMobile}
    style="left: calc({pos}% - 8px); height: {height}px"
    use:drag={move_divider}
  />
</section>
{#if dragging}<div class="cat" />{/if}

<style>
  section {
    flex: 1;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
  }
  .pane {
    float: left;
    overflow: auto;
    position: relative;
  }
  :global(.pane > section) {
    padding: var(--gap);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--gap);
  }
  .divider {
    display: block;
    position: absolute;
    padding-inline: 8px;
    inline-size: 0;
    cursor: col-resize;
    z-index: 10;
  }
  .divider.is-mobile {
    display: none;
  }
  .divider::after {
    content: "";
    position: absolute;
    inset-inline-start: 6px;
    inset-block-start: 0;
    inline-size: 4px;
    block-size: 100%;
    background-color: var(--fg);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .divider:hover::after {
    opacity: 1;
  }
  .cat {
    position: absolute;
    inset: 0;
  }
  @media screen and (max-width: 720px) {
    section {
      display: flex;
      flex-flow: column nowrap;
    }
    .divider {
      display: none;
    }
    .pane {
      display: block;
      width: 100% !important;
      max-height: unset;
      overflow: visible;
    }
    :global(.pane > section) {
      padding-top: 0;
    }
  }
</style>
