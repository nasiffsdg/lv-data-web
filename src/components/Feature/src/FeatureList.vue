<template>
  <div class="inverted-main-grid py-8 gap-8 box-border">
    <div class="relative overflow-hidden h-56 lg:h-auto rounded-2xl bg-ob-deep-800 shadow-lg">
      <span class="absolute top-0 w-full h-full z-0" :style="gradientBackground" />
      <div class="ob-gradient-plate opacity-90 relative z-10 bg-ob-deep-900 rounded-2xl flex justify-start items-end px-8 pb-10 shadow-md">
        <h2 class="text-3xl pb-8 lg:pb-16">
          <p :style="gradientText">OPTIONS</p>
        </h2>
      </div>
    </div>

    <ul class="grid lg:grid-cols-2 gap-8">
      <div class="ob-gradient-plate opacity-90 relative z-10 bg-ob-deep-900 rounded-2xl flex justify-start items-end px-8 pb-10 shadow-md">
        <h2 class="text-3xl pb-8 lg:pb-16">
          <p :style="gradientText">CREATE YOUR PROJECT</p>
        </h2>
      </div>
      <div class="ob-gradient-plate opacity-90 relative z-10 bg-ob-deep-900 rounded-2xl flex justify-start items-end px-8 pb-10 shadow-md">
        <h2 class="text-3xl pb-8 lg:pb-16">
          <p :style="gradientText">CREATE YOUR PROJECT</p>
        </h2>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { useAppStore } from '@/stores/app'
import { useArticleStore } from '@/stores/article'
import { useI18n } from 'vue-i18n'
import { computed, defineComponent, toRef } from 'vue'
import { ArticleCard } from '@/components/ArticleCard'
import Profile from "@/components/Sidebar/src/Profile.vue";

export default defineComponent({
  name: 'FeatureList',
  components: {
    Profile,
    ArticleCard
  },
  setup() {
    const appStore = useAppStore()
    const articleStore = useArticleStore()
    const { t } = useI18n()
    return {
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.header_gradient_css }
      }),
      gradientText: appStore.themeConfig.background_gradient_style,
      featuredArticles: toRef(articleStore.$state, 'featuredArticles'),
      t
    }
  }
})
</script>

<style lang="scss">
.home-featured-article {
  .article-content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .article-footer {
      margin-top: 10px;
    }
  }
}
</style>
