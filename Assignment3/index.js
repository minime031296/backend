const path = require("path");
const fs = require('fs')

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

const filePath = path.join(__dirname, file)

switch (operation) {
    case 'read' :
        fs.readFile(filePath, 'utf-8', (err,data)=> {
            try {
                if(err){
                    console.error(err.message);
                }else{
                    console.log(data)
                }
            } catch (error) {
                console.log('error in read file');
            }
        })
    break;
    case 'create':
            fs.writeFile(filePath, content, 'utf-8', (err) => {
                try {
                    if(err){
                        console.error(err.message);
                    }else{
                        console.log('File test.txt created')
                    }
                } catch (error) {
                    console.log('error in write file');
                }
            })
    break;
    case 'append':
        fs.appendFile(filePath, content, 'utf-8',(err) => {
            try {
                if(err){
                    console.error(err.message);
                }else{
                    console.log('Content appended to the file test.txt')
                }
            } catch (error) {
                console.log('error in append file');
            }
        })
    break;
    
    case 'delete':
        fs.unlink(filePath, (err) => {
            try {
                if(err){
                    console.error(err.message);
                }else{
                    console.log('File deleted')
                }
            } catch (error) {
                console.log('error in deleting file');
            }
        })
    break
    case 'rename':
        let newFilePath = process.argv[2]
        fs.rename(filePath, newFilePath, (err)=> {
            try {
                if(err){
                    console.error(err.message);
                }else{
                    console.log(`new file:${newFilePath}`)
                }
            } catch (error) {
                console.log('error in deleting file');
            }
        }) 
    break;
    case 'list':
        fs.readdir(file, (err,data)=> {
            try {
                if(err){
                    console.error(err.message);
                }else{
                    data.forEach(file => {
                        console.log(file)
                    });
                }
            } catch (error) {
                console.log('error in deleting file');
            }
        })
    break;
    default:
    console.log(`Invalid operation '${operation}'`);
}
