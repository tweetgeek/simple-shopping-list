<template>
  <div
    class="bg-surface-50 py-2 px-3 rounded-md flex gap-2 align-middle items-center justify-between hover:bg-surface-100"
    :class="{ 'bg-primary-50 hover:bg-primary-100': !!item.checkedAt }"
    @click.stop.prevent="$emit('toggle')"
  >
    <div class="flex gap-2 align-middle items-center">
      <Checkbox
        :model-value="!!item.checkedAt"
        :binary="true"
        @value-change.stop.prevent="$emit('toggle')"
      />
      <div>{{ item.name }}</div>
    </div>
    <Button
      v-if="canRemove"
      icon="pi pi-trash"
      class="p-0"
      variant="text"
      severity="danger"
      size="small"
      @click.prevent.stop="$emit('remove')"
    />
  </div>
</template>
<script setup lang="ts">
import { Checkbox } from 'primevue';
import type { IListItem } from '../../utils/types';
import Button from 'primevue/button';

defineProps<{
  item: IListItem;
  canRemove?: boolean;
}>();

defineEmits<{
  (e: 'toggle'): void;
  (e: 'remove'): void;
}>();
</script>
