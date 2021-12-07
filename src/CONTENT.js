export default 
`import { ResizeObserver } from 'resize-observer';
import _ from 'lodash';
import { Editor } from '@/components'

export default {
  name: 'App',
  components: {
    Editor
  },
  data() {
    return {
      content: '// to do',
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
`