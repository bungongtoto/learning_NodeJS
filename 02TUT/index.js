const fsPromises = require('fs').promises
const path  = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'started.txt'), 'utf-8');
        console.log(data);

        await fsPromises.unlink(path.join(__dirname, 'files', 'started.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'),data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'),'\n\nNice to meet you Bungong.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'),path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8');
        console.log(newData);
    } catch (error) {
        console.log(error)
    }
}


fileOps()
// fs.readFile(path.join(__dirname, 'files', 'started.txt'), 'utf-8',(err, data)=>{
//     if (err) throw err;
//     console.log(data);
// })
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice to meet you Bungong',(err)=>{
//     if (err) throw err;
//     console.log('Operation Completed');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n\nYes it is',(err)=>{
//         if (err) throw err;
//         console.log('Append Complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'newReply.txt'),(err)=>{
//             if (err) throw err;
//             console.log('Rename Complete');
//         })
//     })
// })



// exit on uncaught errors
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})