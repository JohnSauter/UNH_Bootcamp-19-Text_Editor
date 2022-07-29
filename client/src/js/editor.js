// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    /* The document is held in local storage under the key "content"
     * and also in an IndexDB database called jate in a document also
     * called jate, which has one property called "1" whose value
     * is an object with a property named "text" whose value is
     * the text string which is the document.  */

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, 
    // and if neither is available, set the value to header.
    getDb(1).then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      console.log(data);
      const the_text = data.text;
      this.editor.setValue(the_text || localData || header);
    });

    /* If the editor signals that something has changed, save it
     * in local storage.  */
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(1, localStorage.getItem('content'));
    });
  }
}
