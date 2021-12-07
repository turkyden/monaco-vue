<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-300" id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h2 class="text-6xl text-white text-shadow pb-20 font-bold">Monaco Vue</h2>
    <Editor
      ref="editor"
      v-model="content"
      class="w-1/3 h-1/3 rounded shadow-2xl"
      :language="language"
      :theme="darkMode ? 'vs-dark' : 'vs'"
      @editorDidMount="editorDidMount"
    />
  </div>
</template>

<script>
import { ResizeObserver } from 'resize-observer';
import _ from 'lodash';
import { Editor } from '@/components';
import CONTENT from './CONTENT';

export default {
  name: 'App',
  components: {
    Editor
  },
  data() {
    return {
      content: CONTENT,
      darkMode: false,
      language: 'javascript'
    }
  },
  methods: {
    editorDidMount(editor) {
      // 动态修改 editor 宽度
      new ResizeObserver(_.debounce(
        () => {
          editor.layout();
          this.isResizing = true;
        },
        0,
      )).observe(document.body);
      new ResizeObserver(_.debounce(
        () => {
          editor.layout();
          this.isResizing = false;
        },
        250,
      )).observe(document.body);
      // Listen to scroll event
      editor.onDidScrollChange(() => {
        // this.isResizing = true;
      });
      const { monaco } = this.$refs.editor;
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
        () => {
          this.handleSaveCode();
        }
      );
    },
    handleSaveCode() {
      console.log(this.content);
    }
  }
}
</script>