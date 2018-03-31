<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form :label-width="80">
                        <FormItem label="公告标题" :error="articleError">
                            <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                        </FormItem>
                    </Form>

                    <Upload ref="upload" multiple :style="{display:'none'}"
                        :show-upload-list="false"
                        action="http://localhost:8070/uploadCover"
                        :on-format-error="handleFormatError"
                        
                        :on-success="handleSuccess"
                        :on-error="handleError" class="line upload"
                        name="file" >
                        <span>请选择文件</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline" id='upload'>上传附件</Button>
                        
                    </Upload>
                        <div class="tip" ref="tip" v-if="true">
                            <ul>
                                <li v-for="(list,index) of listData" >
                                    
                                    <div class="tip-one" >
                                    <Icon type="document-text" size="15"></Icon>
                                    <span ref="dd">{{ list["dataName"] }}</span>
                                    <Icon type="close" @click.native="handleClick(index)" class="icon"></Icon>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                    <div class="margin-top-20">
                        <textarea id="articleEditor" v-model="articleEditor"></textarea>
                  
                    </div>
                </Card>
            </Col>
            <Col span="6" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <p>
                    发送部门：
                     <Row class="dep">
                         <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择部门">
                            <Option v-for="item in dep" :value="item.depId" :key="item.depId">{{ item.depName }}</Option>
                        </Select>
                                
                    </Row>
                    </p>
                    <p class="margin-top-10">
                        
                       <Row>
                        <span class="publish-button"><Button @click="handleSaveDraft">保存草稿</Button></span>
                        <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                       
                       </Row>
                    </p>
                    
                </Card>
               
               
            </Col>
        </Row>
    </div>
</template>

<script>
import tinymce from 'tinymce';

export default {
    name: 'artical-publish',
    data () {
        return {
            articleTitle: '',
            articleError: '',
            dep:[],
            showLink: false,
            fixedLink: '',
            articlePath: '',
            articlePathHasEdited: false,
            editLink: false,
            articleEditor:"",
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            articleTagSelected: [], // 文章选中的标签
            listData:[],
            publishLoading: false,
           
        };
    },
    methods: {
          handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
                });
            },
            
            handleSuccess (res, file) {
                var fileName = res.paths[0];
                var item = {};
                
                if(res.paths[0].lastIndexOf("/")==-1){
                    item["dataName"]=fileName.substring(fileName.lastIndexOf("\\")+1);
                     item["dataPath"]=fileName.substring(0,fileName.lastIndexOf("\\"));
                }else{
                    item["dataName"]=fileName.substring(fileName.lastIndexOf("/")+1);
                    item["dataPath"]=fileName.substring(0,fileName.lastIndexOf("/")); 
                }
                console.log(item)
               
                this.listData.push(item)
                // this.uploadList.push(item["dataName"]);
                // console.log(this.uploadList)
                console.log(this.listData,"sfsfssf1")
                // this.uploadList.push(res.paths[0]);
               
                this.$Notice.success({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传成功。'
                });
                
               
                
            },
            handleError (event, file) {

                this.$Notice.error({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传失败。'
                });
            },
            handleClick (index) {
                var current = this;
                // current.$refs.dd[index].innerText,
                this.$axios.post('/deleteAttachment', {
                    path: current.listData[index]
                    
                })
                .then(function (response) {
                    current.listData.splice(index,1);
                    console.log(JSON.stringify(current.listData))
                    current.$Message.success('文件删除成功');
                   
                })
                .catch(function (err) {
                    
                      
                       
                });
            } ,
        handleArticletitleBlur () {
            if (this.articleTitle.length !== 0) {
                // this.articleError = '';
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
                if (!this.articlePathHasEdited) {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
                    this.articlePath = this.articleTitle;
                    this.articlePathHasEdited = true;
                    this.showLink = true;
                }
            } else {
                this.articleError = '文章标题不可为空哦';
                // this.$Message.error('文章标题不可为空哦');
            }
        },
       
       
        handlePublish () {
            let depList = '';
            console.log(this.articleTagSelected)
            for(item of this.articleTagSelected){
                depList =depList+item+"@,";
            }
            let item = {};
            item["title"] = this.articleTitle;
            item["content"] = tinymce.activeEditor.getContent();
             item["department"] = depList;
             item["state"] = '1';
             item["listData"] = this.listData;
             alert(depList)
             var vm = this;
                 this.$axios.post('/addNotice',item)
                    .then(function (response) {
                        if(response.data.code == 0){
                             vm.$Message.destroy();
                               vm.$Notice.success({
                                    title: '操作成功！！！',
                                    duration: 2
                                });
                            vm.$emit("ee");
                        }else{
                            vm.$Message.destroy();
                               vm.$Notice.error({
                                    title: '操作失败！！！',
                                    duration: 2
                                });
                        }
                    })
                    .catch(function (err) {
                       
                    })
        },
        handleSelectTag () {
            localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
        }
    },
    
    computed: {
        
    },
    mounted () {
        let vm = this;
             this.$axios.get('/find', {params: {type:10}})
                .then(function (response) {
                  // console.log(response);
                      vm.dep = response.data.list;
                      
                   
                })
                .catch((response) => {
                });

        tinymce.init({
            selector: '#articleEditor',
            branding: false,
            elementpath: false,
            height: 600,
            language: 'zh_CN.GB2312',
            menubar: 'edit insert view format table tools ',
            // content_css: [
            // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            // '//www.tinymce.com/css/codepen.min.css'],
            
            setup: function(editor) {
                editor.addMenuItem('myitem', {
                text: '上传附件',
                context: 'tools',
                onclick: function() {
                  let input = document.getElementById('upload');
                    // input.type = 'file';
                    input.click();
                
                }
                });
            },
            // convert_urls: false,
            // theme: 'modern',
            toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen imageupload `,
          plugins: `
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            media
            lists
            textcolor
            colorpicker
            hr
            preview
            imageupload
          `,

          
          // CONFIG

          forced_root_block: 'p',
          force_p_newlines: true,
          importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
          content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

          insert_button_items: 'image link | inserttable',

          // CONFIG: Paste
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]',        // word需要它
          paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,

          // CONFIG: Font
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

          // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
              ]
            }
          ],

          // FontSelect
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

          // Tab
          tabfocus_elements: ':prev,:next',
          object_resizing: true,
//      images_upload_url: 'postAcceptor.php',
  
//   // we override default upload handler to simulate successful upload
//   images_upload_handler: function (blobInfo, success, failure) {
//     setTimeout(function() {
//       // no matter what you upload, we will turn it into TinyMCE logo :)
//       success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
//     }, 2000);
//   },
 file_picker_types: 'image', 
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    // Note: In modern browsers input[type="file"] is functional without 
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];
      
      var reader = new FileReader();
      reader.onload = function () {
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  },
  
//   init_instance_callback: function (ed) {
//     ed.execCommand('mceImage');
//   },

         content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    // '//www.tinymce.com/css/codepen.min.css'
  ],
          imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
         
        });
        
      
    },
    destroyed () {
        tinymce.get('articleEditor').destroy();
    }
};
</script>
