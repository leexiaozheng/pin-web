
import { useCallback, useEffect, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
const compiler = require('vue-template-compiler')

let isInit = false;

const Editor: NextPage = () => {
    const editor = useRef(null)
    const test = useCallback(() => {
        if (editor.current) {
            const value = editor.current.getValue()
            console.log(value)
            const result = compiler.parseComponent(value)
            console.log(result)
        }

    }, [])

    useEffect(() => {
        if (!isInit) {
            editor.current = window.monaco.editor.create(document.getElementById('editor') as HTMLElement, {
                value: "function hello() {\n\talert('Hello world!');\n}",
                language: 'vue'
            });
            isInit = true
        }

    }, [])

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    data-name="vs/editor/editor.main"
                    href="/monaco-editor/min/vs/editor/editor.main.css"
                />
            </Head>
            <script defer src="/require.js"></script>
            <script defer src="/monaco-editor/min/vs/loader.js"></script>
            <script defer src="/monaco-editor/min/vs/loader.js"></script>
            <script defer src="/monaco-editor/min/vs/editor/editor.main.nls.js"></script>
            <script defer src="/monaco-editor/min/vs/editor/editor.main.js"></script>
            <button onClick={test}>测试</button>
            <div id="editor" style={{ width: '800px', height: '600px', border: '1px solid grey' }}></div>
        </div>
    )
}

export default Editor
