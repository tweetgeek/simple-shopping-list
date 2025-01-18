<template>
  <div class="flex flex-1 w-full p-4 border-t">
    <Form v-slot="$form" :initialValues :resolver validateOnSubmit class="flex gap-4 w-full">
      <div class="flex flex-1 flex-col gap-1">
        <InputText
          ref="productInput"
          name="product"
          type="text"
          placeholder="Product name"
          fluid
          autofocus
        />
        <Message v-if="$form.product?.invalid" severity="error" size="small" variant="simple">
          {{ $form.product.error?.message }}
        </Message>
      </div>
      <Button type="button" label="Add product" @click.prevent.stop="onFormSubmit($form)" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Button, InputText, Message } from 'primevue';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { type ComponentPublicInstance, onMounted, reactive, useTemplateRef } from 'vue';
import type { FormResolverOptions } from '@primevue/forms/form';
import { useProductsStore } from '../../stores/products';

const productStore = useProductsStore();
const toast = useToast();

const initialValues = reactive({
  product: '',
});

const resolver = ({ values }: FormResolverOptions) => {
  const errors: { product?: { message: string }[] } = {};

  if (values && !values.product) {
    errors.product = [{ message: 'Product name is required.' }];
  }

  return {
    errors,
  };
};

// @ts-ignore
const onFormSubmit = (form: any) => {
  if (form.valid) {
    toast.add({
      severity: 'success',
      summary: 'Product added to your list.',
      life: 2000,
    });

    productStore.addProduct(form.product.value);

    form.product.value = '';
    form.product.dirty = false;
    form.product.touched = false;
    form.product.valid = true;
    form.product.touched = false;
    form.product.pristine = true;
    form.product.error = null;
    form.product.errors = [];

    form.reset();
    setTimeout(() => {
      if (productInput.value && productInput.value.$el) {
        productInput.value.$el.value = '';
      }
      productInput.value?.$el?.focus();
    }, 100);
  }
};
const productInput = useTemplateRef<ComponentPublicInstance>('productInput');

onMounted(() => {
  setTimeout(() => {
    productInput.value?.$el?.focus();
  }, 100);
});
</script>
