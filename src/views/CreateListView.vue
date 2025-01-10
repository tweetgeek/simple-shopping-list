<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import Button from 'primevue/button';
import { Form, FormField } from '@primevue/forms';
import { Checkbox, InputGroup, InputGroupAddon, InputText, Message } from 'primevue';
import { useShopListsStore } from '@/stores/shopLists.ts';
import router from '@/router';
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import {
  DEFAULT_STORAGE_ITEM,
  type StorageList,
  type StorageListItem,
} from '../../utils/storage.ts';
import type { FormSubmitEvent } from '@primevue/forms/form';
import { v4 as uuidv4 } from 'uuid';

const shoppListsStore = useShopListsStore();

const form = ref(null);
const inputs = ref(null);

const goBack = () => {
  router.push({ name: 'home' });
};

const resolver = zodResolver(
  z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    items: z
      .array(
        z.object({
          value: z.string(),
          checked: z.boolean(),
        }),
      )
      .min(1, { message: 'Product is required.' }),
  }),
);

const toast = useToast();

const itemsFieldDefaultValue = [{ ...DEFAULT_STORAGE_ITEM }];

const initialValues = reactive({
  name: '',
  items: itemsFieldDefaultValue,
});

const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  console.log('form.valid', valid);
  if (valid) {
    console.log('form.values', values);
    const itemsWithoutEmpty = values.items.filter((item) => item.value !== '');

    if (itemsWithoutEmpty < 1) {
      toast.add({
        severity: 'error',
        summary: 'At least one product is required.',
        life: 3000,
      });
      return;
    }

    const newUuid = uuidv4();
    shoppListsStore.setActiveList(newUuid);
    shoppListsStore.updateLists({
      ...shoppListsStore.lists.value,
      [newUuid]: {
        name: values.name,
        items: itemsWithoutEmpty.map((item) => ({
          value: item.value,
          checked: item.checked,
          checkedAt: item.checked ? new Date() : null,
        })) as StorageListItem[],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as StorageList,
    });

    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    });

    router.push({ name: 'home' });
  }
};

const onEnter = () => {
  onComplete();
  if (inputs.value) {
    inputs.value[inputs.value.length - 1].$el.focus();
  }
};
const onComplete = () => {
  const items = form.value?.fields.items.states.value;

  if (items.length > 0 && items[items.length - 1].value === '') {
    return;
  }

  items.push({ ...DEFAULT_STORAGE_ITEM });
};

const removeItem = (index: number) => {
  const items = form.value?.fields.items.states.value;

  items.splice(index, 1);
};
</script>

<template>
  <AppLayout>
    <template #center>
      <div class="card flex justify-center">Create new list</div>
    </template>

    <template #left>
      <Button
        icon="pi pi-chevron-left"
        variant="text"
        rounded
        severity="secondary"
        size="large"
        @click="goBack"
      />
    </template>

    <div class="p-4 flex flex-col gap-3">
      <Form
        v-slot="$form"
        ref="form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-56"
      >
        <div class="flex flex-col gap-1">
          <InputText name="name" type="text" placeholder="Name" fluid />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name.error?.message }}
          </Message>
        </div>

        <div class="flex gap-2 flex-col">
          <p class="font-semibold">Products</p>
          <FormField
            v-slot="$field"
            :initialValue="itemsFieldDefaultValue"
            name="items"
            class="flex flex-col gap-1"
          >
            <InputGroup v-for="(item, index) in $field.value" :key="index">
              <InputGroupAddon :class="{ 'bg-primary-100': item.checked && item.value !== '' }">
                <Checkbox :name="`items[${index}].checked`" v-model="item.checked" :binary="true" />
              </InputGroupAddon>
              <InputText
                :class="{ 'bg-primary-100': item.checked && item.value !== '' }"
                :name="`items[${index}].value`"
                placeholder="Product name"
                ref="inputs"
                v-model="item.value"
                @update:modelValue="onComplete"
                @keyup.stop.prevent.enter="onEnter"
              />
              <InputGroupAddon
                v-if="$field.value.length > 1 && index !== $field.value.length - 1"
                class="p-0"
              >
                <Button
                  icon="pi pi-times"
                  severity="secondary"
                  variant="text"
                  @click="removeItem(index)"
                />
              </InputGroupAddon>
            </InputGroup>
          </FormField>
        </div>

        <Button type="submit" severity="secondary" label="Save list" />
      </Form>
    </div>
  </AppLayout>
</template>
