import http from 'http'
import { loggers } from '../winston/winstonLoggers'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const server = http.createServer((req: any, res: any) => {
    // loggers.info(req)

    const fileName: string = fileURLToPath(import.meta.url);
    const dirName: string = path.dirname(fileName)

    try {
        res.statusCode = 200
        res.setHeader('content-type', 'text/plain')
        const ReadFilepath:string = path.join(dirName,'index.txt')
        // loggers.info(ReadFilepath)
        const content: any = fs.readFileSync(ReadFilepath,'utf-8')
        res.write(content)
        res.end()

    } catch (error: any) {
        res.statusCode = 404
        res.setHeader('content-type', 'text/plain')
        res.write('Page not Fount')
        res.end()
        loggers.error(error)
    }
})

const PORT: number = 3001


server.listen(PORT, () => {
    loggers.info(`server running at ${PORT}`)
})