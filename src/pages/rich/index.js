import { Button, Card,Modal } from 'antd'
import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import draftjs from 'draftjs-to-html'
export default class Rich extends Component {
    state={
        showRichText:false,
        editorState:''
    }
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState
        })
    }
    handleClearContent=()=>{
        this.setState({
            editorState:EditorState.createEmpty()
        })
    }
    handleGetContent=()=>{
        this.setState({
            showRichText:true
        })
    }
    onContentStateChange= (contentState) => {
        this.setState({
          contentState,
        });
      };
    render() {
        const {editorState}=this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent} style={{marginRight:20}}>清空文本</Button>
                    <Button type="primary" onClick={this.handleGetContent}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    />;
                </Card>
                <Modal
                title="富文本"
                visible={this.state.showRichText}
                onCancel={()=>{
                    this.setState({
                        showRichText:false
                    })
                }}
                footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
