(function() {
    tinymce.create('tinymce.plugins.ImageUploadPlugin', {
        init : function(ed, url) {
            url = tinyMCE.activeEditor.getParam('imageupload_rel') || url;
            var imageUploadUrl = tinyMCE.activeEditor.getParam('imageupload_url');

            var head = document.getElementsByTagName('body')[0];
            var css = document.createElement('link');
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = url + '/css/style.css';
            head.appendChild(css);
            
            // Register commands
            ed.addCommand('mceImageUpload', function() {
                $('#image_upload_type').val('tinymce'); 
                $('body').append('<div class="imageUploadBg"></div>');
                
                var showImageUploadError = function(msg) {
                    $('.imageUploadError').html(msg).show();
                    removeForeground();
                };
                
                var removeForeground = function() {
                    $('.imageUploadFg').remove();
                    $('.imageUploadFgLoading').remove();
                };
                
                var removeBackground = function() {
                    $('.imageUploadBg').remove();
                    $('.imageUploadContainer').remove();
                };

                var container = '\
                    <div class="imageUploadContainer mce-container mce-panel mce-window">\
                        <div class="imageUploadContainerInner">\
                            <div class="mce-window-head">\
                                <div class="mce-title">图片上传</div>\
                                <button type="button" class="mce-close">×</button>\
                            </div>\
                            <form action="' + imageUploadUrl + '" method="POST"  enctype="multipart/form-data" id="uploadImageForm">\
                            <div class="mce-container imageUploadFormContainer" hidefocus="1" tabindex="-1">\
                                <div class="mce-container-body" style="padding-left: 20px;">\
                                    <label for="image-upload-area">选择图片</label>\
                                    <input type="file" name="file" id="image-upload-area" class="mce-textbox mce-placeholder" hidefocus="true" style="width: 258px;" accept="image/*">\
                                </div>\
                                <p class="imageUploadError"></p>\
                            </div>\
                            </form>\
                            <div class="imageUploadConfirmCase mce-panel">\
                                <div class="mce-btn mce-primary">\
                                    <button role="presentation" class="imageUploadSubmit">上传</button>\
                                </div>\
                                <div class="mce-btn">\
                                    <button role="presentation" class="imageUploadClose">放弃</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ';
                
                $('body').append(container);
                
                $('.imageUploadBg, .imageUploadContainer .imageUploadClose, .mce-close').on('click', function(){
                    removeForeground();
                    removeBackground();
                });

                var submitUpload = function(){
                    $('#uploadImageForm').ajaxSubmit({
                        dataType: 'json',
                        success: function(response){
                            if (response.url) {
                                var tpl = '<img src="%s" width="220" data-key="%k"/>';
                                var tplV = tpl.replace('%s', response.url);
                                tplV = tplV.replace('%k', response.key);
                                ed.insertContent(tplV);
                                ed.focus();
                                removeForeground();
                                removeBackground();
                            } else {
                                showImageUploadError('上传失败，请重试！');
                            }
                        },
                        error: function(){
                            showImageUploadError('上传失败，请重试！');
                        }
                    });
                }

                $('#uploadImageForm').submit(function(){
                    submitUpload();
                    return false;
                });
                
                $('.imageUploadSubmit').on('click', function(){
                    
                    $('.imageUploadError').html('').hide();
                    
                    if ($('#image-upload-area').val() != '') {
                        $('body').append('<div class="imageUploadFg"></div>');
                        $('body').append('<div class="imageUploadFgLoading"></div>');
                        $('#uploadImageForm').submit();
                    } else {
                        showImageUploadError('请选择图片格式的文件上传');
                    }
                    
                });
            });

            // Register buttons
            ed.addButton('imageupload', {
                title : '文件上传',
                cmd : 'mceImageUpload',
                image : url + '/img/icon.png'
            });
        },

        getInfo : function() {
            return {
                longname : 'Image Upload',
                author : 'BoxUK',
                authorurl : 'https://github.com/boxuk/tinymce-imageupload',
                infourl : 'https://github.com/boxuk/tinymce-imageupload/blob/master/README.md',
                version : '1.0.0'
            };
        }
    });

    tinymce.PluginManager.add('imageupload', tinymce.plugins.ImageUploadPlugin);
})();
