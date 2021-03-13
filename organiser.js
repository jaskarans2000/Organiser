#!/usr/bin/env node

let fs=require('fs');
let path=require('path');

(function(){
    let cmd=process.argv[2]
    const dir = fs.opendirSync(cmd)
    let dirent
    while ((dirent = dir.readSync()) !== null) {
    let content=dirent.name.split('.')
    if(fs.existsSync(`${cmd}//${content[1]}`)){
        moveFile(cmd,dirent.name,`${content[1]}`)
    }else{
        fs.mkdirSync(`${cmd}//${content[1]}`)
        moveFile(cmd,dirent.name,`${content[1]}`)
    }
    console.log(content)
    }
    dir.closeSync()
})();

function moveFile(directory,filename,newfolder){
    const currentPath = path.join(directory, filename)
    const newPath = path.join(directory, newfolder, filename)
    try {
        fs.renameSync(currentPath, newPath)
        console.log("Successfully moved the file!")
      } catch(err) {
        console.log(err)
      }
}