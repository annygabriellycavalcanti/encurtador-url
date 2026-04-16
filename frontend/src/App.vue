<script setup lang="ts">
// Importações do Vue e de bibliotecas
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLinkStore } from './stores/linkStore';
import { useToast } from 'primevue/usetoast';

// Componentes PrimeVue
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';

// --- Estado do Componente ---

const originalUrl = ref('');
const loading = ref(false);
const backendUrl = 'http://localhost:3333';
const linkStore = useLinkStore();
const links = computed(() => linkStore.links);
const toast = useToast();
let pollingInterval: number;

// Executado quando o componente é montado no DOM.

onMounted(() => {
  linkStore.fetchLinks(); 
  pollingInterval = window.setInterval(() => {
    linkStore.fetchLinks();
  }, 980);
});

onUnmounted(() => {
  clearInterval(pollingInterval);
});

// --- Funções ---

/**
 * Envia a URL original para ser encurtada pela API.
 * Exibe notificações de sucesso ou erro.
 */
async function enviaurl() {

  // Valida se a URL foi inserida.

  if (!originalUrl.value) {
    toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, insira uma URL.', life: 3000 });
    return;
  }
  
  loading.value = true;
  try {

    // Chama a ação do store para encurtar a URL.

    await linkStore.shortenUrl(originalUrl.value);
    const newLink = linkStore.newShortLink;
    
    // Exibe toast de sucesso com o novo link.

    if (newLink) {
      toast.add({ 
        severity: 'success', 
        summary: 'URL Encurtada!', 
        detail: `${backendUrl}/${newLink.shortCode}`, 
        life: 5000 
      });
    }
    originalUrl.value = '';
  } catch (err: any) {

    // Em caso de erro, exibe uma mensagem detalhada.

    const detailMessage = err.response?.data?.error || 'Não foi possível encurtar a URL.';
    toast.add({ 
      severity: 'error', 
      summary: 'Erro', 
      detail: detailMessage,
      life: 3000 
    });
  } finally {
    loading.value = false;
  }
}

/**
 * Copia o texto fornecido (URL encurtada) para a área de transferência.
 * @param {string} text - O texto a ser copiado.
 */

function copiaTextoURL(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ severity: 'info', summary: 'Copiado!', detail: 'Link copiado para a área de transferência.', life: 3000 });
}
</script>

<template>
  <div class="container mx-auto p-4">

    <!-- Componente para exibir as notificações (toasts) -->
    <Toast />
    <h1 class="text-3xl font-bold text-center my-6">Encurtador de URL</h1>

    <!-- Card para a funcionalidade de encurtar URL -->
    <Card class="mb-8 border border-gray-300 rounded-lg">
      <template #title>
        Encurtar Nova URL
      </template>
      <template #content>
        <div class="flex flex-col sm:flex-row gap-2">

          <!-- Input para o usuário inserir a URL -->
          <InputText
            v-model="originalUrl"
            placeholder="Cole sua URL longa aqui"
            class="flex-grow border-2 border-gray-300 focus:border-blue-500"
            @keyup.enter="enviaurl"
          />
          <!-- Botão para acionar o encurtamento -->
          <Button
            label="Encurtar"
            icon="pi pi-link"
            :loading="loading"
            @click="enviaurl"
            class="encurtar-button"
          />
        </div>
      </template>
    </Card>

    <!-- Exibe um spinner de carregamento enquanto a tabela de links está sendo carregada -->

    <ProgressSpinner v-if="loading" class="text-center my-4" />

    <h2 class="text-2xl font-semibold mb-4">Links Salvos</h2>

    <!-- Tabela de dados para exibir os links já encurtados -->
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <DataTable :value="links" v-if="links.length > 0" responsiveLayout="scroll" :pt="{ bodyRow: { class: 'border-t border-gray-300' } }">
        <!-- Coluna: URL Encurtada -->
        <Column field="shortCode" header="URL Encurtada">
          <template #body="slotProps">
            <a :href="`${backendUrl}/${slotProps.data.shortCode}`" target="_blank" class="text-blue-600 hover:underline">
              {{ backendUrl }}/{{ slotProps.data.shortCode }}
            </a>
          </template>
        </Column>
        <!-- Coluna: URL Original (com truncamento de texto) -->
        <Column field="originalUrl" header="URL Original" style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></Column>
        <!-- Coluna: Cliques -->
        <Column field="clicks" header="Cliques">
          <template #body="slotProps">
            <Tag 
              :value="`${slotProps.data.clicks} cliques`"
              :severity="slotProps.data.clicks > 0 ? 'contrast' : 'success'"
            />
          </template>
        </Column>
        <!-- Coluna: Ações (botão de copiar) -->
        <Column header="Ações">
          <template #body="slotProps">
            <Button 
              icon="pi pi-copy" 
              class="p-button-text" 
              @click="copiaTextoURL(`${backendUrl}/${slotProps.data.shortCode}`)" 
              v-tooltip.top="'Copiar'" 
            />
          </template>
        </Column>
        <template #empty>
          <div class="text-center p-4">Nenhum link encurtado ainda.</div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

