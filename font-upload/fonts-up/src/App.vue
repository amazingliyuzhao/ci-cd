<template>
  <div id="app">
    <div class='contentWrap'>
      <div class="TopLogoWrap" @click="test">Font compression</div>
      <div class="content">
        <el-input
          class="inputArea"
          type="textarea"
          autosize
          placeholder="请输入要压缩的字体内容"
          v-model="textarea">
        </el-input>
        <div class="intro">点击选择字体包</div>
        <div class="fontSelectWrap">
          <div class="fontItem"
            :class="{'active': index === selectFontIndex}"
            v-for="(val,index) in fontList"
            :key="val"
            @click="selectFont(index,val)"
          >
            {{val}}
          </div>
        </div>
        <div class="btnWrap">
          <el-button type="primary" @click="creatFont" round>生成字体包</el-button>
        </div>
        <div class="uploadWrap">
          <div class="title">没有找到字体，点击上传</div>
          <el-upload
            class="upload-demo"
            accept=".ttf,.otf,.TTF,.OTF"
            ref='upload'
            :action="upaction"
            :on-remove="handleRemove"
            :on-error="handleUpErr"
            :before-upload="beforeUpload"
            :on-success="handleUpsuccess"
            :on-progress='handleUpProgress'
            :multiple='false'
            :limit="1"
            :drag='true'
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传ttf/otf文件，且不超过10M</div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UploadReq } from '@/api/main';

@Component
export default class CarouselVertical extends Vue {
  selectFontIndex:number = -1;
  selectFontName: string = '';
  fontList: string[] = [];
  textarea: string = '';
  upaction: string = `${UploadReq.baseDomain}/font/upload`;
  fileList: File[] = [];
  $refs !:{
    upload: HTMLDivElement;
  }

  async created() {
    this.fontList = (await UploadReq.GetFontsList()).data;
    console.log(this.fontList);
  }

  test() {
    console.log(this.textarea);
  }

  async selectFont(index: number, fontName: string) {
    if (!this.textarea) {
      this.$message('请先输入要压缩的文本');
      return;
    }
    this.selectFontName = fontName;
    this.selectFontIndex = index;
    const fontNameHandle = fontName.split('.')[0];
    if (this.textarea) {
      const fontUrl = (await UploadReq.selectFonts(fontName, this.textarea)).data;
      console.log(fontUrl);
      this.setGlobFontStyle(fontNameHandle, fontUrl);
      const putArea = document.querySelector('.inputArea>*') as HTMLTextAreaElement;
      putArea.style.fontFamily = `'${fontNameHandle}'`;
    }
  }

  setGlobFontStyle(font: string, fontUrl:string) {
    const style = document.createElement('style');
    const blob = new Blob([fontUrl], {
      type: 'application/octet-stream',
    });
    const url = window.URL.createObjectURL(blob);
    style.innerHTML = `
      @font-face {
        font-family: '${font}';
        src: url("${url}");
      }
    `;
    document.head.appendChild(style);
  }

  async upFont() {
    const result = await UploadReq.CreateFont('DIN-Condensed-Bold', '234');
    console.log(result);
  }

  async creatFont() {
    if (!this.textarea) {
      this.$message('请先输入要压缩的文本');
      return;
    }
    if (this.selectFontIndex === -1) {
      this.$message('请选择字体包文件');
      return;
    }
    // const result = await UploadReq.CreateFont('DIN-Condensed-Bold', '234');
    const downFile = document.createElement('a');
    downFile.style.display = 'none';
    downFile.href = `${UploadReq.baseDomain}/font/create?fontName=${encodeURIComponent(this.selectFontName)}&text=${this.textarea}`;
    downFile.download = 'dasdsa.ttf'; // 下载后文件名
    document.body.appendChild(downFile);
    downFile.click();
    // document.body.removeChild(downFile); // 下载完成移除元素
  }

  handleRemove(file:File, fileList: any[]) {
    console.log(file, fileList);
  }
  handlePreview(file:File) {
    console.log(file);
  }
  handleExceed(files:File, fileList:any[]) {
    // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  }
  // beforeRemove(file, fileList) {
  //   return this.$confirm(`确定移除 ${file.name}？`);
  // }
  handleUpsuccess() {

  }

  // 文件上传前的校验 —— 常见的校验有：校验文件类型，文件大小
  beforeUpload(file: File) {
    // 允许上传的文件格式列表
    const acceptList = ['otf', 'ttf', 'TTF', 'OTF'];
    // 根据文件名获取文件的后缀名
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    // 判断文件格式是否符合要求
    if (acceptList.indexOf(fileType) === -1) {
      this.$message.error('只能上传 otf/ttf 格式的文件 !');
      return false;
    }
    // 判断文件大小是否符合要求
    if (file.size / 1024 / 1024 > 10) {
      this.$message.error('上传文件大小不能超过 10M !');
      return false;
    }
    return true;
  }

  handleUpErr(err:string) {
    console.log(err);
  }

  handleUpProgress() {
    this.$message('上传中');
  }

  async mounted() {
    console.log(document.querySelector('.inputArea>*'));
    const putArea = document.querySelector('.inputArea>*');
    // putArea.html
    // console.log(this.$refs.upload.querySelector('.inputArea'));
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.TopLogoWrap{
  margin: 30px auto;
  background-color: #42b983;
  color: #fff;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  height: 100px;
  border-radius: 20px;
}
.inputArea{
  width: 30%;
  margin-bottom: 30px;
  font-weight: bolder;
  textarea{
    font-weight: bolder;
  }
}
.intro{
  color: #42b983;
   font-weight: bold;
}
.fontSelectWrap{
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;
  border: 1px solid #42b983;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 30px;
  .fontItem{
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: grey;
    margin: 10px;
    color: #fff;
    font-weight: bold;
    border-radius: 30px;
    &.active{
      background-color: #42b983;
    }
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
